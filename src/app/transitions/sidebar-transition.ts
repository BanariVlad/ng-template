import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const sidebarTransition = trigger('scale', [
  state(
    'opened',
    style({
      fontSize: '22px',
      left: '100px',
      top: '20px',
      'transform-origin': 'right',
    })
  ),
  state(
    'closed',
    style({
      fontSize: '9px',
      'transform-origin': 'right',
      left: 0,
    })
  ),
  transition('closed => opened', [
    animate(
      '0.5s ease-in-out',
      keyframes([
        style({
          opacity: 0.6,
          transform: 'scale(0.6)',
          offset: 0.1,
        }),
        style({ opacity: 0.3, transform: 'scale(0.3)', offset: 0.2 }),
        style({
          opacity: 0.3,
          transform: 'scale(0.3)',
          fontSize: '15px',
          left: '100px',
          top: '20px',
          'transform-origin': 'left',
          offset: 0.7,
        }),
        style({
          opacity: 0.5,
          transform: 'scale(0.5)',
          fontSize: '19px',
          offset: 0.8,
        }),
        style({
          fontSize: '22px',
          opacity: 1,
          transform: 'scale(1)',
          'transform-origin': 'right',
          offset: 1,
        }),
      ])
    ),
  ]),
  transition('opened => closed', [
    animate(
      '0.2s ease-in-out',
      keyframes([
        style({
          fontSize: '22px',
          opacity: 0.6,
          transform: 'scale(0.6)',
          'transform-origin': 'left',
          offset: 0.1,
        }),
        style({
          fontSize: '19px',
          transform: 'scale(0.3)',
          opacity: 0.3,
          offset: 0.3,
        }),
        style({
          fontSize: '12px',
          opacity: 0.3,
          transform: 'scale(0.3)',
          offset: 0.5,
        }),
        style({
          fontSize: '9px',
          opacity: 0.5,
          transform: 'scale(0.5)',
          'transform-origin': 'right',
          left: 0,
          top: 'initial',
          offset: 0.9,
        }),
        style({
          opacity: 1,
          transform: 'scale(0.9)',
          offset: 1,
        }),
      ])
    ),
  ]),
]);
