import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { ErrorHandlerService } from '@/services/error-handler/error-handler.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AlertParams, ShowAlert } from '@/store/alert/alert.actions';
import { Config, HttpConfig, HttpConfigWithStore } from '@/ts/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  cachedResponses: { [key: string]: any } = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  private handlerError(
    error: HttpErrorResponse,
    ignoredErrors?: Array<number> | undefined
  ): Observable<never> {
    this.store.dispatch(new ShowAlert({ type: 'Error', text: error.message }));
    const errorHandler = new ErrorHandlerService(this.router);
    errorHandler.handle(error, ignoredErrors);

    return throwError(() => ({
      ...error.error,
      message: error.message,
      status: error.status,
    }));
  }

  private showAlert(alert: boolean | AlertParams | undefined) {
    if (alert && typeof alert === 'object') {
      this.store.dispatch(new ShowAlert(alert));
    } else if (alert) {
      this.store.dispatch(
        new ShowAlert({ type: 'Success', text: 'Successful operation!' })
      );
    }
  }

  private cacheData(config: Config | undefined, key: string, response: Object) {
    if (config?.cache && !this.cachedResponses[key]) {
      this.cachedResponses[key] = response;
      return;
    }

    if (config?.saveInStore) {
      this.saveInStore(config);
    }
  }

  private checkForCachedResponse(config: Config, url: string): Object | null {
    if (config.cache && this.cachedResponses[url]) {
      return this.cachedResponses[url];
    }

    if (config.saveInStore) {
      return this.getFromStore(config);
    }

    return null;
  }

  private saveInStore({ dispatchKey }: HttpConfigWithStore) {
    try {
      this.store.dispatch(eval(`new ${dispatchKey}(response)`));
    } catch (e) {
      throw new Error('Invalid dispatch key');
    }
  }

  private getFromStore({ module, selector }: HttpConfigWithStore) {
    try {
      return this.store.snapshot()[module][selector];
    } catch (e) {
      console.error('Invalid module or selector key.');
      return null;
    }
  }

  public get(url: string, params?: any, config?: Config): Observable<any> {
    if (config?.cache || config?.saveInStore) {
      const response = this.checkForCachedResponse(config, url);

      if (response) {
        return new BehaviorSubject(response);
      }
    }

    return this.http
      .get(`${environment.apiUrl}/${url}`, {
        params,
        headers: config?.headers || {},
      })
      .pipe(
        tap(() => {
          this.showAlert(config?.alert);
        }),
        map((response) => {
          this.cacheData(config, url, response);

          return response;
        }),
        catchError((error: HttpErrorResponse) =>
          this.handlerError(error, config?.ignoredErrors)
        )
      );
  }

  public post(
    url: string,
    payload?: any,
    config?: HttpConfig
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${url}`, payload).pipe(
      tap(() => {
        this.showAlert(config?.alert);
      }),
      catchError((error: HttpErrorResponse) =>
        this.handlerError(error, config?.ignoredErrors)
      )
    );
  }

  public put(url: string, payload?: any, config?: HttpConfig): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${url}`, payload).pipe(
      tap(() => {
        this.showAlert(config?.alert);
      }),
      catchError((error: HttpErrorResponse) =>
        this.handlerError(error, config?.ignoredErrors)
      )
    );
  }

  public patch(
    url: string,
    payload?: any,
    config?: HttpConfig
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${url}`, payload).pipe(
      tap(() => {
        this.showAlert(config?.alert);
      }),
      catchError((error: HttpErrorResponse) =>
        this.handlerError(error, config?.ignoredErrors)
      )
    );
  }

  public delete(
    url: string,
    payload?: any,
    config?: HttpConfig
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${url}`, payload).pipe(
      tap(() => {
        this.showAlert(config?.alert);
      }),
      catchError((error: HttpErrorResponse) =>
        this.handlerError(error, config?.ignoredErrors)
      )
    );
  }
}
