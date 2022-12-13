import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponentsModule } from '@/layout-components/layout-components.module';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { routeAnimation } from '@/transitions';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, LayoutComponentsModule, RouterOutlet, MatCardModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  animations: [routeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['index'];
  }
}
