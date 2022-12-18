import { Component, OnInit } from '@angular/core';
import { AlertState } from '@/store/alert/alert.state';
import {
  debounceTime,
  finalize,
  interval,
  map,
  Observable,
  take,
  tap,
} from 'rxjs';
import { AlertParams, HideAlert } from '@/store/alert/alert.actions';
import { Select, Store } from '@ngxs/store';
import { Unsubscribe } from '@/shared/classes/unsubscribe';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent extends Unsubscribe implements OnInit {
  readonly alertsLimit = 3;
  public loading: number;

  @Select(AlertState.getAlerts) alerts$: Observable<Array<AlertParams>>;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    const delayMs = 4000;

    this.alerts$.pipe(debounceTime(50)).subscribe(() => {
      if (!this.loading) {
        this.startLoading(delayMs);
      }
    });
  }

  startLoading(totalTimeMs: number): void {
    const steps = 100;

    interval(totalTimeMs / steps)
      .pipe(
        take(steps),
        map((step) => step + 1),
        tap((step) => {
          // steps - 5 to normalize loading as width doesn't match with true loading
          this.loading = (step / (steps - 5)) * 100;
        }),
        finalize(() => {
          this.loading = 0;
          this.store.dispatch(new HideAlert());
        })
      )
      .subscribe();
  }

  alertStyles(index: number): { bottom: number } {
    return {
      bottom: 100 + index * 8,
    };
  }
}
