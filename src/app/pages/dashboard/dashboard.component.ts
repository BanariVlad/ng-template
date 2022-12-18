import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { listTransition } from '@/transitions';
import { ApiService } from '@/api/api.service';
import { Unsubscribe } from '@/shared/classes/unsubscribe';
import { repeat, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [listTransition],
})
export class DashboardComponent extends Unsubscribe implements OnInit {
  loaded = false;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private api: ApiService
  ) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loaded = true;
      this.changeDetection.detectChanges();
    }, 400);

    this.api.dashboard
      .get({ postId: 1 })
      .pipe(takeUntil(this.unsubscribe$), repeat(3))
      .subscribe((response: any) => {
        console.log(response);
      });
  }
}
