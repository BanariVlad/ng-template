import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/modules/material-module.module';

const routes: Route[] = [
  {
    path: '',
    component: CategoriesComponent,
  },
];

@NgModule({
  declarations: [CategoriesComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class CategoriesModule {}
