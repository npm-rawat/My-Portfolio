import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InventoryStore, StockItem } from './inventory-store';

@Component({
  imports: [DatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './workbench.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Workbench {
  readonly store = inject(InventoryStore);
  readonly query = signal('');
  readonly bin = signal('');
  readonly selectedSku = signal('EL-3812');
  readonly selected = computed(() => this.store.session().items.find(item => item.sku === this.selectedSku()));
  readonly bins = computed(() => [...new Set(this.store.session().items.map(item => item.bin))]);
  readonly visibleItems = computed(() => {
    const query = this.query().trim().toLowerCase();
    return this.store.session().items.filter(item =>
      (!this.bin() || item.bin === this.bin())
      && (!query || `${item.name} ${item.sku}`.toLowerCase().includes(query)),
    );
  });
  readonly form = new FormGroup({
    quantity: new FormControl<number | null>(null, [
      Validators.required, Validators.min(0), Validators.max(99999), Validators.pattern(/^[0-9]+$/),
    ]),
    note: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(180)] }),
  });
  readonly validationMessage = signal('');

  constructor() {
    const initial = this.selected();
    if (initial) this.select(initial);
  }

  select(item: StockItem): void {
    this.selectedSku.set(item.sku);
    this.form.reset({ quantity: item.counted, note: item.note });
    this.validationMessage.set('');
  }

  saveCount(item: StockItem): void {
    const { quantity, note } = this.form.getRawValue();
    if (this.form.invalid || quantity === null) {
      this.validationMessage.set('Enter a whole quantity from 0 to 99,999 and keep the reason to 180 characters.');
      return;
    }
    if (quantity !== item.expected && !note.trim()) {
      this.validationMessage.set('Enter a reason for the variance before saving.');
      return;
    }
    this.store.recordCount(item.sku, quantity, note);
    this.validationMessage.set('');
    this.form.markAsPristine();
  }

  variance(item: StockItem): string {
    if (item.counted === null) return '—';
    const difference = item.counted - item.expected;
    return difference > 0 ? `+${difference}` : String(difference);
  }

  resetDemo(): void {
    if (!window.confirm('Reset the demo count and its activity?')) return;
    this.store.reset();
    this.query.set('');
    this.bin.set('');
    const item = this.store.session().items.find(row => row.sku === 'EL-3812');
    if (item) this.select(item);
  }

  downloadCsv(): void {
    const rows = this.store.session().items.map(item =>
      [item.sku, item.bin, item.expected, item.counted ?? '', item.counted === null ? '' : item.counted - item.expected].join(','),
    );
    const url = URL.createObjectURL(new Blob(
      [['sku,bin,expected,counted,variance', ...rows].join('\n')], { type: 'text/csv;charset=utf-8' },
    ));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'zone-b-cycle-count.csv';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
