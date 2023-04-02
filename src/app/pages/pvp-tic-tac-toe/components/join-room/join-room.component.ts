import { PageRoutes } from '@/ts/enums';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss'],
})
export class JoinRoomComponent {
  public roomId: string = '';

  constructor(private router: Router) {}

  public hostGame() {
    this.router.navigate([
      PageRoutes.TicTacToeMultiplayer,
      Math.floor(Math.random() * 1000000),
      'X',
    ]);
  }

  public joinRoom() {
    if (this.roomId) {
      this.router.navigate([PageRoutes.TicTacToeMultiplayer, this.roomId, 'O']);
    }
  }
}
