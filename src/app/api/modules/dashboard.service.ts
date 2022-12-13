import { Injectable } from '@angular/core';
import { HttpService } from '@/services/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private url = 'posts';
  constructor(private http: HttpService) {}

  public get(params: any) {
    return this.http.get(this.url, params);
  }
}
