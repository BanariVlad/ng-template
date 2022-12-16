import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AlertParams, HideAlert, ShowAlert } from './alert.actions';

export class AlertStateModel {
  public isShown: boolean;
  public params: AlertParams | null;
}

const defaults = {
  isShown: false,
  params: null,
};

@State<AlertStateModel>({
  name: 'alert',
  defaults,
})
@Injectable()
export class AlertState {
  @Selector()
  static isShown(state: AlertStateModel): boolean {
    return state.isShown;
  }

  @Selector()
  static params(state: AlertStateModel): AlertParams | null {
    return state.params;
  }

  @Action(ShowAlert)
  showAlert(
    { patchState }: StateContext<AlertStateModel>,
    params: AlertParams
  ) {
    patchState({ isShown: true, params });
  }

  @Action(HideAlert)
  hideAlert({ patchState }: StateContext<AlertStateModel>) {
    patchState({ isShown: false, params: null });
  }
}
