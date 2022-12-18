type AlertTypes = 'Success' | 'Error' | 'Warning' | 'Info';

export interface AlertParams {
  type: AlertTypes;
  text: string;
}

export class ShowAlert {
  static readonly type = '[Alert] ShowAlert';

  constructor(public params: AlertParams) {}
}

export class HideAlert {
  static readonly type = '[Alert] HideAlert';

  constructor() {}
}
