import { Component, OnInit } from '@angular/core';
import { AlertState } from '@/store/alert/alert.state';
import {
  debounceTime,
  finalize,
  interval,
  map,
  Observable,
  Subscription,
  take,
  tap,
} from 'rxjs';
import { AlertParams, HideAlert } from '@/store/alert/alert.actions';
import { Select, Store } from '@ngxs/store';
import { Unsubscribe } from '@/shared/classes/unsubscribe';
import { alertEnterTransition, alertLeaveTransition } from '@/transitions';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [alertLeaveTransition, alertEnterTransition],
})
export class AlertComponent extends Unsubscribe implements OnInit {
  readonly alertsLimit = 3;
  readonly settings = {
    Success: {
      icon: 'check_circle',
      color: 'var(--success)',
    },
    Error: {
      icon: 'error',
      color: 'var(--error)',
    },
    Info: {
      icon: 'info',
      color: 'var(--info)',
    },
    Warning: {
      icon: 'warning',
      color: 'var(--warning)',
    },
  };

  public loading: number;
  private interval: Subscription;

  @Select(AlertState.getAlerts) alerts$: Observable<Array<AlertParams>>;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    //Changing this value be sure debounce is right configured for multiple alerts
    const delayMs = 4000;

    this.alerts$.pipe(debounceTime(50)).subscribe((alerts) => {
      if (!this.loading && alerts.length) {
        this.startLoading(delayMs);
      }
    });
  }

  startLoading(totalTimeMs: number): void {
    const steps = 100;

    this.interval = interval(totalTimeMs / steps)
      .pipe(
        take(steps),
        map((step) => step + 1),
        tap((step) => {
          // (steps - 5) to normalize loading as width doesn't match with true loading
          this.loading = (step / (steps - 5)) * 100;
        }),
        finalize(() => {
          this.loading = 0;
          this.store.dispatch(new HideAlert());
        })
      )
      .subscribe();
  }

  skipAlert() {
    this.loading = 0;
    this.interval.unsubscribe();
  }
}
