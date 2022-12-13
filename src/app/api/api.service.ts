import { Injectable } from '@angular/core';
import { DashboardService } from '@/api/modules/dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public dashboard;

  constructor(private dashboardApi: DashboardService) {
    this.dashboard = dashboardApi;
  }
}
