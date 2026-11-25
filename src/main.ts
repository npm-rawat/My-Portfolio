import { Component, ChangeDetectionStrategy } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, withComponentInputBinding, withHashLocation, withInMemoryScrolling } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class App {}

const loadPortfolioPage = () => import('./portfolio').then(module => module.PortfolioPage);

bootstrapApplication(App, {
  providers: [provideRouter([
    { path: 'workbench', title: 'Stock Count Workbench', loadComponent: () => import('./workbench').then(module => module.Workbench) },
    {
      path: '',
      loadComponent: () => import('./portfolio').then(module => module.Portfolio),
      children: [
        { path: '', pathMatch: 'full', title: 'Anupam Rawat | Senior Software Engineer', data: { page: 'home' }, loadComponent: loadPortfolioPage },
        { path: 'work', title: 'Work | Anupam Rawat', data: { page: 'work' }, loadComponent: loadPortfolioPage },
        {
          path: 'work/:slug',
          title: async route => {
            const { findProject, profile } = await import('./portfolio-content');
            return (findProject(route.paramMap.get('slug') ?? '')?.title ?? 'Project not found') + ' | ' + profile.name;
          },
          data: { page: 'project' },
          loadComponent: loadPortfolioPage,
        },
      ],
    },
    { path: '**', redirectTo: '' },
  ], withHashLocation(), withComponentInputBinding(), withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }))],
}).catch(console.error);
