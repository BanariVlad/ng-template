import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { listTransition } from '@/transitions';
import { ApiService } from '@/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [listTransition],
})
export class DashboardComponent implements OnInit {
  loaded = false;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loaded = true;
      this.changeDetection.detectChanges();
    }, 400);

    this.api.dashboard.get({ postId: 1 }).subscribe((response: any) => {
      console.log(response);
    });
  }
}
