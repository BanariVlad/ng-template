import { Injectable } from '@angular/core';
import { HttpService } from '@/services/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = 'auth';

  constructor(private http: HttpService) {}

  login() {
    return this.http.post(this.url, {});
  }

  logout() {
    return this.http.delete(this.url, {});
  }
}
