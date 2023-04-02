import { MaterialModule } from '@/shared/modules/material-module.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { GamesComponent } from './games.component';

const routes: Route[] = [
  {
    path: '',
    component: GamesComponent,
  },
];

@NgModule({
  // todo rename components
  declarations: [GamesComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
})
export class GamesModule {}
