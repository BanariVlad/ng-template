import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorHandlerService } from '@/services/http/error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private headers: any = {};
  private ignoredErrors: Array<number> = [];

  constructor(private http: HttpClient, private router: Router) {}

  private handlerError(error: HttpErrorResponse): any {
    const errorHandler = new ErrorHandlerService(this.router);
    errorHandler.handle(this.ignoredErrors, error);

    return throwError(() => ({ ...error.error, status: error.status }));
  }

  public get(url: string, params?: any): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/${url}`, {
        params,
        headers: this.headers,
      })
      .pipe(catchError(this.handlerError.bind(this)));
  }

  public post(url: string, payload?: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/${url}`, payload)
      .pipe(catchError(this.handlerError.bind(this)));
  }

  public put(url: string, payload: any): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}/${url}`, payload)
      .pipe(catchError(this.handlerError.bind(this)));
  }

  public patch(url: string, payload: any): Observable<any> {
    return this.http
      .patch(`${environment.apiUrl}/${url}`, payload)
      .pipe(catchError(this.handlerError.bind(this)));
  }

  public delete(url: string, params?: any): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/${url}`, {
        params,
        headers: this.headers,
      })
      .pipe(catchError(this.handlerError.bind(this)));
  }

  public ignoreErrors(...args: Array<number>): HttpService {
    this.ignoredErrors = args;

    return this;
  }
}
