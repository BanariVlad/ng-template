import { GameComponent } from '@/pages/games/multi-player/game.component';
import { MaterialModule } from '@/shared/modules/material-module.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { GamesComponent } from './single-player/games.component';

const routes: Route[] = [
  {
    path: 'single-player',
    component: GamesComponent,
  },
  {
    path: 'multi-player',
    component: GameComponent,
    data: {
      index: 100,
    },
  },
];

@NgModule({
  // todo rename components
  declarations: [GamesComponent, GameComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
})
export class GamesModule {}
