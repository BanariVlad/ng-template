import { animate, style, transition, trigger } from '@angular/animations';

export const alertLeaveTransition = trigger('alertLeave', [
  transition(':leave', [
    animate(
      '0.3s ease-in-out',
      style({ opacity: 0, height: 0, right: '-300px' })
    ),
  ]),
]);

export const alertEnterTransition = trigger('alertEnter', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'scale(0.8)',
    }),
    animate('0.3s ease-in-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
]);
