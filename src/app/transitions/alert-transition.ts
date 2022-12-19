import { animate, style, transition, trigger } from '@angular/animations';

export const alertTransition = trigger('alertLeave', [
  transition(':leave', [
    animate('0.3s ease-in', style({ opacity: 0, height: 0, right: '-300px' })),
  ]),
]);
