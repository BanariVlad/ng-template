import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

const enter = [
  style({ opacity: 0, transform: 'scale(0.8)' }),
  stagger('50ms', [
    animate('300ms ease-in-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
];

export const listTransition = trigger('listTransition', [
  transition(':enter', [query(':enter', enter, { optional: true })]),
]);
