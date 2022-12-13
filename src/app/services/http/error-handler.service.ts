import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private router: Router) {}

  public handle(ignoredErrors: Array<number>, error: HttpErrorResponse): void {
    if (ignoredErrors.includes(error.status)) {
      return;
    }

    const statusCodes: { [key: number]: Function } = {
      404: () => this.router.navigateByUrl('/auth/login'),
    };

    statusCodes[error.status]?.() || this.router.navigateByUrl('/auth/login');
  }
}
