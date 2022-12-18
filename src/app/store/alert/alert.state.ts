import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AlertParams, HideAlert, ShowAlert } from './alert.actions';

export class AlertStateModel {
  public alerts: Array<AlertParams>;
}

const defaults = {
  alerts: [],
};

@State<AlertStateModel>({
  name: 'alert',
  defaults,
})
@Injectable()
export class AlertState {
  @Selector()
  static getAlerts(state: AlertStateModel): Array<AlertParams> {
    return state.alerts;
  }

  @Action(ShowAlert)
  showAlert(
    { patchState, getState }: StateContext<AlertStateModel>,
    { params }: ShowAlert
  ) {
    const state = getState();

    patchState({ alerts: [...state.alerts, params] });
  }

  @Action(HideAlert)
  hideAlert({ patchState, getState }: StateContext<AlertStateModel>) {
    const { alerts } = getState();

    if (alerts.length) {
      patchState({ alerts: alerts.slice(1, alerts.length) });
    }
  }
}
