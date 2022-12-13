import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material-module.module';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss'],
  standalone: true,
  imports: [MaterialModule],
})
export class HelpCenterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
