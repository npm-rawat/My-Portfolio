import { ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, DOCUMENT, ElementRef, ViewEncapsulation,
  afterRenderEffect, computed, inject, input, signal, viewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { capabilities, experience, experienceOverlap, findProject, profile, Project, projects } from './portfolio-content';

type NavSection = 'home' | 'work' | 'experience' | 'contact';

@Component({
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="portfolio-shell">
      <a class="skip-link" [routerLink]="[]" fragment="main">Skip to content</a>
      <header class="site-header">
        <nav class="site-wrap header-inner" aria-label="Main navigation" #mainNav>
          @for (link of navigation(); track link.id; let active = $first) {
            <a [routerLink]="link.route" [fragment]="link.fragment"
              [attr.aria-current]="active ? 'location' : null">{{ link.label }}</a>
          }
        </nav>
      </header>
      <router-outlet />
      <footer class="site-footer">
        <div class="site-wrap footer-inner">
          <a routerLink="/" class="footer-name">{{ profile.name }}</a>
          <div>
            @if (profile.github) { <a [href]="profile.github">GitHub</a> }
            @if (profile.resume) { <a [href]="profile.resume">Résumé</a> }
            <a [href]="profile.linkedin">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  `,
  styleUrl: './portfolio.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Portfolio {
  readonly profile = profile;
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly nav = viewChild<ElementRef<HTMLElement>>('mainNav');
  private readonly active = signal(this.navSection(this.router.url));
  private previousNav?: {
    positions: Map<HTMLElement, number>;
    focused: HTMLElement | null;
  };
  private readonly links: readonly { id: NavSection; label: string; route: string; fragment?: string }[] = [
    { id: 'home', label: 'Home', route: '/' },
    { id: 'work', label: 'Work', route: '/work' },
    { id: 'experience', label: 'Experience', route: '/', fragment: 'experience' },
    { id: 'contact', label: 'Contact', route: '/', fragment: 'contact' },
  ];
  readonly navigation = computed(() => {
    const active = this.active();
    return [...this.links.filter(link => link.id === active), ...this.links.filter(link => link.id !== active)];
  });

  constructor() {
    const document = this.document;
    inject(ViewportScroller).setOffset(() => [0, document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 0]);

    afterRenderEffect(() => {
      this.navigation();
      const previous = this.previousNav;
      this.previousNav = undefined;
      if (!previous) return;

      if (previous.focused?.isConnected && this.document.activeElement === this.document.body) {
        previous.focused.focus({ preventScroll: true });
      }

      const reducedMotion = this.document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches;
      for (const [link, oldLeft] of previous.positions) {
        link.getAnimations().forEach(animation => animation.cancel());
        const distance = oldLeft - link.getBoundingClientRect().left;
        if (!reducedMotion && Math.abs(distance) > 1) {
          link.animate(
            [{ transform: `translateX(${distance}px)` }, { transform: 'translateX(0)' }],
            { duration: 320, easing: 'cubic-bezier(.22, .75, .25, 1)' },
          );
        }
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed(),
    ).subscribe(event => {
      const url = event.urlAfterRedirects;
      const section = this.navSection(url);
      if (section !== this.active()) {
        const links = this.nav()?.nativeElement.querySelectorAll<HTMLElement>('a') ?? [];
        const positions = new Map<HTMLElement, number>();
        let focused: HTMLElement | null = null;
        for (const link of links) {
          positions.set(link, link.getBoundingClientRect().left);
          if (link === this.document.activeElement) focused = link;
        }
        this.previousNav = { positions, focused };
        this.active.set(section);
      }

      if (url === '/#explore') {
        void this.router.navigate(['/'], { fragment: 'work', replaceUrl: true });
      }
    });
  }

  private navSection(url: string): NavSection {
    const { root, fragment } = this.router.parseUrl(url);
    if (root.children['primary']?.segments[0]?.path === 'work' || fragment === 'work' || fragment === 'explore') {
      return 'work';
    }
    if (fragment === 'experience' || fragment === 'contact') return fragment;
    return 'home';
  }
}

@Component({
  selector: 'app-project-visual',
  template: `
    @if (project().visual; as visual) {
      @switch (visual.kind) {
        @case ('image') {
          <figure class="project-visual workbench-visual">
            <img [src]="visual.src" [alt]="visual.alt" [width]="visual.width" [height]="visual.height" loading="lazy">
          </figure>
        }
        @case ('stream') {
          <div class="project-visual stream-visual">
            <figure class="visual-window">
              <figcaption class="window-caption">
                <span>Assistant message lifecycle</span>
                <span class="sample-label">Synthetic example</span>
              </figcaption>
              <ol class="stream-flow">
                <li><span>Request</span><p>Why did this modem go offline?</p></li>
                <li><span>WebSocket chunks</span><code>Checking recent signal events…</code><code>Signal loss reported.</code></li>
                <li><span>Rendered response</span><p><strong>Signal loss detected.</strong> Review recent modem events.</p></li>
              </ol>
            </figure>
          </div>
        }
        @case ('migration') {
          <div class="project-visual migration-visual">
            <figure class="visual-window">
              <figcaption class="window-caption">
                <span>Core ATS module</span>
                <span class="sample-label">Migration overview</span>
              </figcaption>
              <div class="migration-flow">
                <div><span>Source</span><strong>AngularJS</strong></div>
                <span class="migration-line" aria-hidden="true">→</span>
                <div><span>Target</span><strong>Angular</strong></div>
              </div>
              <p class="migration-note">Existing recruitment workflows carried forward</p>
            </figure>
          </div>
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectVisual {
  readonly project = input.required<Project>();
}

@Component({
  imports: [RouterLink, ProjectVisual],
  templateUrl: './portfolio.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPage {
  readonly page = input<'home' | 'work' | 'project'>('home');
  readonly slug = input<string>();
  readonly project = computed(() => findProject(this.slug() ?? ''));
  readonly profile = profile;
  readonly projects = projects;
  readonly featured = projects.filter(project => project.featured);
  readonly timeline = experience.flatMap(entry => {
    if ('title' in entry) return [{ ...entry, slug: '' }];
    const project = findProject(entry.project);
    return project ? [{ title: project.title, period: project.period, summary: project.summary, slug: project.slug }] : [];
  });
  readonly overlap = experienceOverlap;
  readonly capabilities = capabilities;
}
