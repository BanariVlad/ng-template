import { ApiService } from '@/api/api.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  constructor(
    private api: ApiService,
    public todoService: TodoService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.todoService.connect();

    this.api.todos.getTodos().subscribe((response) => {
      this.todoService.setTodos(response);
    });
  }

  public openCreateDialog(): void {
    this.matDialog.open(CreateTodoComponent);
  }

  public drop(event: CdkDragDrop<any>): void {
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // } else {
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // }

    this.todoService.updateTodo({
      ...event.item.data,
      status: event.container.id,
      index: event.currentIndex,
      previousIndex: event.previousIndex,
      containerToDelete: event.previousContainer.id,
    });
  }
}
