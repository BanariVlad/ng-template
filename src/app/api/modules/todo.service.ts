import { HttpService } from '@/services/http/http.service';
import { ApiRoutes } from '@/ts/enums';
import { Todo } from '@/ts/interfaces';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpService) {}

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(ApiRoutes.Todos);
  }
}
