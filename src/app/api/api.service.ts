import { DashboardService } from '@/api/modules/dashboard.service';
import { Injectable } from '@angular/core';
import { AuthService } from './modules/auth.service';
import { CategoriesService } from './modules/categories';
import { TodoService } from './modules/todo.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    public readonly dashboard: DashboardService,
    public readonly users: CategoriesService,
    public readonly todos: TodoService,
    public readonly auth: AuthService
  ) {}
}
