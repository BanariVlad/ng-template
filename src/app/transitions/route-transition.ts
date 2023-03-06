import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

const UNIT = 60;

const optional = { optional: true };
const timings = '0.25s ease-in-out';

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
    timings,
    style({
      opacity: 0,
      transform: `translateY(${UNIT}px)`,
    })
  ),
];

const leaveUp = [
  absolute,
  animate(
    timings,
    style({
      opacity: 0,
      transform: `translateY(-${UNIT}px)`,
    })
  ),
];

const leaveRight = [
  absolute,
  animate(
    timings,
    style({
      opacity: 0,
      transform: `translateX(${UNIT}px)`,
    })
  ),
];

const leaveLeft = [
  absolute,
  animate(
    timings,
    style({
      opacity: 0,
      transform: `translateX(-${UNIT}px)`,
    })
  ),
];

const enterUp = [
  style({
    transform: `translateY(-${UNIT}px)`,
  }),
  animate(
    timings,
    style({
      opacity: 1,
      transform: 'translateY(0)',
    })
  ),
];

const enterDown = [
  style({
    transform: `translateY(${UNIT}px)`,
  }),
  animate(
    timings,
    style({
      opacity: 1,
      transform: 'translateY(0)',
    })
  ),
];

const enterRight = [
  style({
    transform: `translateX(${UNIT}px)`,
  }),
  animate(
    timings,
    style({
      opacity: 1,
      transform: 'translateX(0)',
    })
  ),
];

const enterLeft = [
  style({
    transform: `translateX(-${UNIT}px)`,
  }),
  animate(
    timings,
    style({
      opacity: 1,
      transform: 'translateX(0)',
    })
  ),
];

export const routeAnimation = trigger('routeAnimation', [
  transition(':decrement', [
    query(':enter', enter, optional),
    query(':leave', leaveDown, optional),
    query(':enter', enterUp, optional),
  ]),
  transition(':increment', [
    query(':enter', enter, optional),
    query(':leave', leaveUp, optional),
    query(':enter', enterDown, optional),
  ]),
]);

export const routeChildrenAnimation = trigger('routeChildrenAnimation', [
  transition(':increment', [
    query(':enter', enter, optional),
    query(':leave', leaveLeft, optional),
    query(':enter', enterRight, optional),
  ]),
  transition(':decrement', [
    query(':enter', enter, optional),
    query(':leave', leaveRight, optional),
    query(':enter', enterLeft, optional),
  ]),
]);
