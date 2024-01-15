import { User } from '@/ts/interfaces';

export class UserLogin {
  static readonly type = '[User] Login';
  constructor(public user: User) {}
}

export class UserLogout {
  static readonly type = '[User] Logout';
  constructor() {}
}
