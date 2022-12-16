import { Injectable } from '@angular/core';
import { DashboardService } from '@/api/modules/dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public readonly dashboard: DashboardService) {}
}
