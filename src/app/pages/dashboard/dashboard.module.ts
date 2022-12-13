import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '@/shared/modules/material-module.module';

const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
