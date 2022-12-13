import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'antiplagiat',
    loadComponent: () =>
      import('src/app/pages/antiplagiat/antiplagiat.component').then(
        (m) => m.AntiplagiatComponent
      ),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('src/app/layouts/auth/auth.component').then(
        (m) => m.AuthComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('src/app/pages/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('src/app/pages/errors/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AuthRouterModule {}
