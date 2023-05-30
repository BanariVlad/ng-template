import { MaterialModule } from '@/shared/modules/material-module.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { TodoComponent } from './todo.component';

const routes: Route[] = [
  {
    path: '',
    component: TodoComponent,
  },
];

@NgModule({
  declarations: [TodoComponent, CreateTodoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class TodoModule {}
