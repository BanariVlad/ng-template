import { AuthGuard } from '@/guards/auth.guard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('src/app/layouts/default/default.component').then(
        (m) => m.DefaultComponent
      ),
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('src/app/pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('src/app/pages/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'tools',
        loadChildren: () =>
          import('src/app/pages/tools/tools.module').then((m) => m.ToolsModule),
      },
      {
        path: 'tic-tac-toe',
        loadChildren: () =>
          import('src/app/pages/games/games.module').then((m) => m.GamesModule),
      },
      //indexing items for animation
    ].map((item: any, index: number) => ({
      ...item,
      data: { ...item.data, index },
    })),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class DefaultRouterModule {}
