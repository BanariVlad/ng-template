import { AuthGuard } from '@/guards/auth.guard';
import { MaterialModule } from '@/shared/modules/material-module.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { CreateComponent } from './views/create/create.component';
import { EditComponent } from './views/edit/edit.component';
import { OverviewComponent } from './views/overview/overview.component';

const routes: Route[] = [
  {
    path: '',
    component: OverviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
];

@NgModule({
  declarations: [OverviewComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
})
export class CategoriesModule {}
