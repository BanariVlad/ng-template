import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  public title: string;

  constructor(private todoService: TodoService) {}

  public addTodo(): void {
    this.todoService.createTodo(this.title);
  }
}
