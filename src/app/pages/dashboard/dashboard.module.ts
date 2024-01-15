import { AuthGuard } from '@/guards/auth.guard';
import { MaterialModule } from '@/shared/modules/material-module.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
