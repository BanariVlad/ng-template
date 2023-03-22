import { DashboardService } from '@/api/modules/dashboard.service';
import { Injectable } from '@angular/core';
import { CategoriesService } from './modules/categories';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    public readonly dashboard: DashboardService,
    public readonly users: CategoriesService
  ) {}
}
