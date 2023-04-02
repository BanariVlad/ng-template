import { Component } from '@angular/core';
//@ts-ignore
import Minimax from 'tic-tac-toe-minimax';

const { GameStep } = Minimax;

type Difficulty = 'Easy' | 'Normal' | 'Hard';

@Component({
  selector: 'app-ai-tic-tac-toe',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  public gameState: Array<number | string> = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  public winner: string | undefined;
  public playing = false;
  public computerFirst = false;
  public helpMode = false;
  public helpIndex: number | null = null;
  public difficulty: Difficulty = 'Normal';

  constructor() {}

  toggleGame(toggle: boolean): void {
    if (toggle === this.playing) {
      return;
    }

    this.gameState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.winner = undefined;

    if (toggle && this.computerFirst) {
      this.makeComputerMove();
    }

    this.playing = toggle;
  }

  makeComputerMove(): void {
    const symbols = {
      huPlayer: 'X',
      aiPlayer: 'O',
    };

    const winnerMapping: { [index: string]: any } = {
      huPlayer: 'Human Wins!',
      aiPlayer: 'Computer Wins!',
      draw: "It's a Draw!",
    };

    const result = GameStep([...this.gameState], symbols, this.difficulty);

    this.gameState = [...result.board];

    if (result.winner) {
      this.winner = winnerMapping[result.winner];
      this.playing = false;

      return;
    }

    if (this.helpMode) {
      this.helpWithMove();
    }
  }

  helpWithMove(): void {
    if (!this.helpMode) {
      return;
    }

    const symbols = {
      huPlayer: '0',
      aiPlayer: 'X',
    };

    const { board } = GameStep([...this.gameState], symbols, 'Easy');

    this.helpIndex = this.gameState.findIndex(
      (item: string | number, index: number) => board[index] !== item
    );

    if (this.helpIndex === -1) {
      this.helpIndex = this.gameState.findIndex(
        (item: number | string) => typeof item === 'number'
      );
    }
  }

  makeHumanMove(field: number): void {
    if (!this.playing || typeof this.gameState[field] !== 'number') {
      return;
    }

    this.gameState[field] = 'X';
    this.makeComputerMove();
  }
}
