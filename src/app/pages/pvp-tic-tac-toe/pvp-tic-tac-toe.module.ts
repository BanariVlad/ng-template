import { TrackByModule } from '@/directives/track-by/track-by.module';
import { AuthGuard } from '@/guards/auth.guard';
import { GameComponent } from '@/pages/pvp-tic-tac-toe/game.component';
import { MaterialModule } from '@/shared/modules/material-module.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ChatComponent } from './components/chat/chat.component';
import { JoinRoomComponent } from './components/join-room/join-room.component';

const routes: Route[] = [
  {
    path: '',
    component: JoinRoomComponent,
  },
  {
    path: ':id/:symbol',
    component: GameComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [GameComponent, JoinRoomComponent, ChatComponent],
  imports: [
    CommonModule,
    PickerModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TrackByModule,
    RouterModule.forChild(routes),
  ],
})
export class PvpTicTacToeModule {}
