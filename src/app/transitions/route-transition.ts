import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

const absolute = style({
  position: 'absolute',
  height: '100%',
  width: '100%',
  overflow: 'auto',
});

const enter = [
  style({
    opacity: 0,
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'auto',
  }),
];

const leaveDown = [
  absolute,
  animate(
    '0.25s ease-in-out',
    style({
      opacity: 0,
      transform: 'translateY(30px)',
    })
  ),
];

const leaveUp = [
  absolute,
  animate(
    '0.25s ease-in-out',
    style({
      opacity: 0,
      transform: 'translateY(-30px)',
    })
  ),
];

const enterUp = [
  style({
    transform: 'translateY(-30px)',
  }),
  animate(
    '0.25s ease-in-out',
    style({
      opacity: 1,
      transform: 'translateY(0)',
    })
  ),
];

const enterDown = [
  style({
    transform: 'translateY(30px)',
  }),
  animate(
    '0.25s ease-in-out',
    style({
      opacity: 1,
      transform: 'translateY(0)',
    })
  ),
];

export const routeAnimation = trigger('routeAnimation', [
  transition(':decrement', [
    query(':enter', enter, { optional: true }),
    query(':leave', leaveDown, { optional: true }),
    query(':enter', enterUp, { optional: true }),
  ]),
  transition(':increment', [
    query(':enter', enter, { optional: true }),
    query(':leave', leaveUp, { optional: true }),
    query(':enter', enterDown, { optional: true }),
  ]),
]);
