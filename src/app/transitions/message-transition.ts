import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const messageTransition = trigger('sending', [
  transition(':enter', [
    style({ scale: 0.1, transform: 'translate(500%, 500%)', offset: 0 }),
    animate(
      '0.4s ease',
      keyframes([style({ scale: 0.2, transform: 'translate(0, 0)', offset: 0.9 }), style({ scale: 1, offset: 1 })])
    ),
  ]),
]);
