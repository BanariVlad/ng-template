import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponentsModule } from '@/layout-components/layout-components.module';
import { Router, RouterOutlet, RoutesRecognized } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { routeAnimation, routeChildrenAnimation } from '@/transitions';
import { Unsubscribe } from '@/shared/classes/unsubscribe';
import { filter } from 'rxjs';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, LayoutComponentsModule, RouterOutlet, MatCardModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  animations: [routeAnimation, routeChildrenAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent extends Unsubscribe implements OnInit {
  private from: string = '';

  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.from = this.router.url;

    this.router.events
      .pipe(filter((event: any) => event instanceof RoutesRecognized))
      .subscribe(() => {
        this.from = this.router.url;
      });
  }

  prepareRoute(outlet: RouterOutlet): number | null {
    return outlet?.activatedRouteData?.['index'];
  }

  prepareChildren(): number {
    return Number(this.isChild);
  }

  get isChild(): boolean {
    if (!this.from) {
      return true;
    }

    return (
      this.router.url.length > this.from?.length &&
      this.router.url.includes(this.from)
    );
  }
}
