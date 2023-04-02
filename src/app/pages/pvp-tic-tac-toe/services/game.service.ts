import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

type GameSymbol = 'X' | 'O';

export type Board = Array<number | GameSymbol>;

interface Move {
  moveIndex: number | null;
  board: Board;
  symbol: GameSymbol;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private socket: Socket;

  private roomId: string;

  public wins$ = new Subject<number>();

  public board$ = new BehaviorSubject<Board>([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  public move$ = new BehaviorSubject<GameSymbol | null>('X');

  constructor() {}

  public connect() {
    this.socket = io(`${environment.socketUrl}/game`);

    this.socket.on('connect', () => {
      this.socket.emit('joinRoom', this.roomId, environment.googleLoginKey);
    });

    this.socket.on('wins', (wins: number) => {
      this.wins$.next(wins);
    });

    this.socket.on('win', () => {
      this.move$.next(null);
    });

    this.socket.on('move', ({ newBoard, move }: any) => {
      this.board$.next(newBoard);
      this.move$.next(move);

      console.log(move);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }

  public resetBoard() {
    this.board$.next([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    this.makeMove({
      moveIndex: null,
      board: this.board$.getValue(),
      symbol: 'X',
    });
  }

  public makeMove(move: Move) {
    this.socket.emit('makeMove', {
      ...move,
      roomId: this.roomId,
      playerId: environment.googleLoginKey,
    });
  }

  public disconnect() {
    this.socket.emit('leaveRoom', this.roomId);
  }

  set room(value: string) {
    this.roomId = value;
  }
}
