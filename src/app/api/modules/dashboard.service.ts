import { Injectable } from '@angular/core';
import { HttpService } from '@/services/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly url = 'posts';

  constructor(private http: HttpService) {}

  public get(params: any) {
    return this.http.get(this.url, params, {
      alert: true,
    });
  }

  public get1(params: any) {
    return this.http.get(this.url, params);
  }

  public get2(params: any) {
    return this.http.get(this.url, params);
  }
}
