import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@/guards/auth.guard';

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
        path: 'help',
        loadComponent: () =>
          import('src/app/pages/help-center/help-center.component').then(
            (m) => m.HelpCenterComponent
          ),
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
