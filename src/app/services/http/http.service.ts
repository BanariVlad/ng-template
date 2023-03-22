import { ErrorHandlerService } from '@/services/error-handler/error-handler.service';
import { AlertParams, ShowAlert } from '@/store/alert/alert.actions';
import { Config, HttpConfig, HttpConfigWithStore } from '@/ts/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';

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

  private cacheData(config: Config | undefined, key: string, response: any) {
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

  public get<T>(url: string, params?: any, config?: Config): Observable<T> {
    const checkForCachedResponse = <T>(
      config: Config,
      url: string
    ): T | null => {
      if (config.cache && this.cachedResponses[url]) {
        return this.cachedResponses[url];
      }

      if (config.saveInStore) {
        return this.getFromStore(config);
      }

      return null;
    };

    if (config?.cache || config?.saveInStore) {
      const response: T | null = checkForCachedResponse(config, url);

      if (response) {
        return new BehaviorSubject<T>(response);
      }
    }

    const apiUrl = config?.ignorePrefix
      ? environment.apiUrl.replace('/api/v1', '')
      : environment.apiUrl;

    return this.http
      .get<T>(`${apiUrl}${url}`, {
        params,
      })
      .pipe(
        tap(() => {
          this.showAlert(config?.alert);
        }),
        map((response: T) => {
          this.cacheData(config, url, response);

          return response;
        }),
        catchError((error: HttpErrorResponse) =>
          this.handlerError(error, config?.ignoredErrors)
        )
      );
  }

  public post<T>(
    url: string,
    payload?: any,
    config?: HttpConfig
  ): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}${url}`, payload).pipe(
      tap(() => {
        this.showAlert(config?.alert);
      }),
      catchError((error: HttpErrorResponse) =>
        this.handlerError(error, config?.ignoredErrors)
      )
    );
  }

  public put<T>(
    url: string,
    payload?: any,
    config?: HttpConfig
  ): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}${url}`, payload).pipe(
      tap(() => {
        this.showAlert(config?.alert);
      }),
      catchError((error: HttpErrorResponse) =>
        this.handlerError(error, config?.ignoredErrors)
      )
    );
  }

  public patch<T>(
    url: string,
    payload?: any,
    config?: HttpConfig
  ): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}${url}`, payload).pipe(
      tap(() => {
        this.showAlert(config?.alert);
      }),
      catchError((error: HttpErrorResponse) =>
        this.handlerError(error, config?.ignoredErrors)
      )
    );
  }

  public delete<T>(url: string, config?: HttpConfig): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}${url}`).pipe(
      tap(() => {
        this.showAlert(config?.alert);
      }),
      catchError((error: HttpErrorResponse) =>
        this.handlerError(error, config?.ignoredErrors)
      )
    );
  }
}
