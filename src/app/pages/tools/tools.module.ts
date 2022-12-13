import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsComponent } from './tools.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/modules/material-module.module';

const routes: Route[] = [
  {
    path: '',
    component: ToolsComponent,
  },
];

@NgModule({
  declarations: [ToolsComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class ToolsModule {}
