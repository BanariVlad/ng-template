import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public winner: string | undefined;
  public playing = false;
  public computerFirst = false;
  public helpMode = false;
  public helpIndex: number | null = null;
  public mySymbol: 'X' | 'O';

  constructor(public game: GameService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const symbol = this.route.snapshot.paramMap.get('symbol') as string;
    this.mySymbol = symbol as 'X' | 'O';

    this.game.room = this.route.snapshot.paramMap.get('id') as string;
    this.game.connect();
  }

  public makeMove(moveIndex: number) {
    this.game.makeMove({
      moveIndex,
      board: this.game.board$.getValue(),
      symbol: this.mySymbol,
    });
  }
}
