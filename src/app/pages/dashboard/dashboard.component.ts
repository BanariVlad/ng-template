import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { listTransition } from '@/transitions';
import { ApiService } from '@/api/api.service';
import { Unsubscribe } from '@/shared/classes/unsubscribe';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [listTransition],
})
export class DashboardComponent
  extends Unsubscribe
  implements OnInit, AfterViewInit
{
  loaded = false;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private http: ApiService
  ) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loaded = true;
      this.changeDetection.detectChanges();
    }, 400);

    this.http.dashboard
      .get({ postId: 1 })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  ngAfterViewInit() {
    this.http.dashboard
      .get1({ postId: 1 })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        console.log(response);
      });

    this.http.dashboard
      .get2({ postId: 1 })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        console.log(response);
      });
  }
}
