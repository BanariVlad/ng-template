import { HttpService } from '@/services/http/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService) {}

  login(payload: {
    username: string;
    password: string;
  }): Observable<{ username: string }> {
    return this.http.post('/login', payload);
  }
}
