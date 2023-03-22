import { HttpService } from '@/services/http/http.service';
import { ApiRoutes } from '@/ts/enums';
import { User } from '@/ts/interfaces';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpService) {}

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(ApiRoutes.Users);
  }

  public getById(id: number | string): Observable<User> {
    return this.http.get<User>(`${ApiRoutes.User}/${id}`);
  }

  public createUser(payload: User): Observable<User> {
    return this.http.post<User>(ApiRoutes.User, payload, { alert: true });
  }

  public updateUser(id: number | string, payload: User): Observable<User> {
    return this.http.put<User>(`${ApiRoutes.User}/${id}`, payload, {
      alert: true,
    });
  }

  public deleteUser(id: number | string): Observable<string> {
    return this.http.delete<string>(`${ApiRoutes.User}/${id}`, {
      alert: true,
    });
  }
}
