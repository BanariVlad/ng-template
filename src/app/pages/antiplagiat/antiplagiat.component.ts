import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@/shared/modules/material-module.module';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { finalize, forkJoin, Observable } from 'rxjs';

const RATE = 15;

@Component({
  selector: 'app-antiplagiat',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './antiplagiat.component.html',
  styleUrls: ['./antiplagiat.component.scss'],
})
export class AntiplagiatComponent implements OnInit {
  model: string = '';
  loading = false;
  result: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  checkForPlagiarism() {
    this.loading = true;

    const requests: Array<Observable<any>> = this.groupedWords.map(
      (words: Array<string>) =>
        this.http.get('http://localhost:8010/proxy/search', {
          params: {
            q: words.join(' '),
          },
          responseType: 'text',
        })
    );

    forkJoin(requests)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (results: any) => {
          const trueResults = results.filter(
            (result: string) => result.length > 320000
          );

          this.result = Math.round(
            100 - (trueResults.length * 10) / results.length
          );
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  get groupedWords() {
    const dividedModel = this.model.split(' ');

    return [...new Array(Math.round(dividedModel.length / RATE + 1) || 1)]
      .fill('')
      .reduce(
        (acc: Array<any>, word: string, index: number) => [
          ...acc,
          [dividedModel.slice(index * RATE, RATE * index + RATE).flat()],
        ],
        []
      );
  }
}
