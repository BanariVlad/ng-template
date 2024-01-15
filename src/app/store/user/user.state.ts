import { User } from '@/ts/interfaces';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserLogin, UserLogout } from './user.actions';

export class UserStateModel {
  public user: User | null;
}

const credentials: string | null = sessionStorage.getItem('credentials');

const defaults = {
  user: credentials ? JSON.parse(credentials) : {},
};

@State<UserStateModel>({
  name: 'user',
  defaults,
})
@Injectable()
export class UserState {
  @Selector()
  static getUser({ user }: UserStateModel): User | null {
    return user;
  }

  @Action(UserLogin)
  login({ setState }: StateContext<UserStateModel>, { user }: { user: User }) {
    sessionStorage.setItem('credentials', JSON.stringify(user));

    setState({ user });
  }

  @Action(UserLogout)
  logout({ setState }: StateContext<UserStateModel>) {
    sessionStorage.removeItem('credentials');

    setState({ user: {} as User });
  }
}
