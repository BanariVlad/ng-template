import { Todo } from '@/ts/interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private socket: Socket;

  public todo$ = new BehaviorSubject<Todo[]>([]);
  public check$ = new BehaviorSubject<Todo[]>([]);
  public done$ = new BehaviorSubject<Todo[]>([]);

  constructor() {}

  public connect() {
    this.socket = io(`${environment.socketUrl}/todo`);

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('newTodo', (response: Todo) => {
      this.todo$.next([...this.todo$.value, response]);
    });

    this.socket.on('updatedTodo', (response: Todo) => {
      const observer = (this as any)[`${response.status}$`];
      const previous = (this as any)[`${response.containerToDelete}$`];

      observer.next([
        ...observer.value.slice(0, response.index),
        response,
        ...observer.value.slice(response.index, observer.value.length),
      ]);

      previous.next([
        ...previous.value.slice(0, response.previousIndex),
        ...previous.value.slice(
          (response.previousIndex as number) + 1,
          previous.length
        ),
      ]);
    });

    this.socket.on('todoDeleted', ({ message }: any) => {
      console.log('Todo deleted:', message);
    });
  }

  public createTodo(title: string) {
    this.socket.emit('createTodo', {
      title,
      status: 'todo',
      index: this.todo$.value.length,
    });
  }

  public updateTodo(event: Todo) {
    this.socket.emit('updateTodo', event);
  }

  public setTodos(response: Todo[]) {
    this.todo$.next(response.filter((todo) => todo.status === 'todo'));
    this.check$.next(response.filter((todo) => todo.status === 'check'));
    this.done$.next(response.filter((todo) => todo.status === 'done'));
  }
}
