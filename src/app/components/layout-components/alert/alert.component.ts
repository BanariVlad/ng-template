import { Component, OnInit } from '@angular/core';
import { AlertState } from '@/store/alert/alert.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Select(AlertState.isShown) isShown$: Observable<boolean>;

  constructor() {}

  ngOnInit(): void {}
}
