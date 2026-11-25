import { computed, Injectable, signal } from '@angular/core';

export type CountStatus = 'In progress' | 'In review' | 'Approved';

export interface StockItem {
  sku: string;
  name: string;
  bin: string;
  expected: number;
  counted: number | null;
  note: string;
}

interface CountEvent {
  id: number;
  at: string;
  message: string;
}

interface CountSession {
  title: string;
  status: CountStatus;
  items: StockItem[];
  events: CountEvent[];
}

const storageKey = 'stock-count-workbench.v1';

function demoSession(): CountSession {
  return {
    title: 'Zone B cycle count',
    status: 'In progress',
    items: [
      { sku: 'EL-1024', name: '24 V power supply', bin: 'B-01', expected: 48, counted: 48, note: '' },
      { sku: 'EL-2056', name: 'DIN rail terminal block', bin: 'B-01', expected: 120, counted: 116, note: 'Four units in the inspection area.' },
      { sku: 'EL-3812', name: 'Shielded sensor cable', bin: 'B-02', expected: 35, counted: null, note: '' },
      { sku: 'EL-4127', name: 'Panel mount fuse holder', bin: 'B-02', expected: 62, counted: null, note: '' },
      { sku: 'EL-5460', name: 'M12 proximity sensor', bin: 'B-03', expected: 24, counted: null, note: '' },
      { sku: 'EL-6091', name: 'Industrial relay module', bin: 'B-03', expected: 18, counted: null, note: '' },
    ],
    events: [
      { id: 2, at: '2026-11-25T04:50:00Z', message: 'EL-2056 counted at 116. Variance: −4.' },
      { id: 1, at: '2026-11-25T04:45:00Z', message: 'EL-1024 counted at 48. Variance: 0.' },
    ],
  };
}

@Injectable({ providedIn: 'root' })
export class InventoryStore {
  private readonly state = signal<CountSession>(this.readSession());
  readonly session = this.state.asReadonly();
  readonly storageAvailable = signal(true);
  readonly counted = computed(() => this.state().items.filter(item => item.counted !== null).length);
  readonly discrepancies = computed(() =>
    this.state().items.filter(item => item.counted !== null && item.counted !== item.expected).length,
  );
  readonly remaining = computed(() => this.state().items.length - this.counted());

  recordCount(sku: string, quantity: number, note: string): void {
    const current = this.state();
    const item = current.items.find(row => row.sku === sku);
    if (!item || current.status !== 'In progress' || !Number.isInteger(quantity) || quantity < 0 || quantity > 99999) {
      return;
    }
    const reason = note.trim();
    const difference = quantity - item.expected;
    if ((difference !== 0 && !reason) || reason.length > 180 || (item.counted === quantity && item.note === reason)) return;
    this.commit({
      ...current,
      items: current.items.map(row => row.sku === sku ? { ...row, counted: quantity, note: reason } : row),
    }, `${sku} counted at ${quantity}. Variance: ${difference > 0 ? '+' : ''}${difference}.`);
  }

  submit(): void {
    const current = this.state();
    if (current.status === 'In progress' && this.remaining() === 0) {
      this.commit({ ...current, status: 'In review' }, 'Count submitted for review.');
    }
  }

  review(approved: boolean): void {
    const current = this.state();
    if (current.status === 'In review') {
      this.commit({ ...current, status: approved ? 'Approved' : 'In progress' },
        approved ? 'Count approved.' : 'Count returned for recount.');
    }
  }

  reset(): void {
    this.persist(demoSession());
  }

  private commit(session: CountSession, message: string): void {
    const event = { id: (session.events[0]?.id ?? 0) + 1, at: new Date().toISOString(), message };
    this.persist({ ...session, events: [event, ...session.events] });
  }

  private persist(session: CountSession): void {
    this.state.set(session);
    try {
      localStorage.setItem(storageKey, JSON.stringify(session));
      this.storageAvailable.set(true);
    } catch {
      this.storageAvailable.set(false);
    }
  }

  private readSession(): CountSession {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as CountSession;
        if (['In progress', 'In review', 'Approved'].includes(parsed.status)
          && Array.isArray(parsed.items) && Array.isArray(parsed.events)) return parsed;
      }
    } catch {
      // Continue with the sample session when browser storage is unavailable.
    }
    return demoSession();
  }
}
