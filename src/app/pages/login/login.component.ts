import { ApiService } from '@/api/api.service';
import { PageRoutes } from '@/ts/enums';
import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private api: ApiService
  ) {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.min(8)]),
    });
  }

  submit() {
    this.form.markAsTouched();

    if (this.form.valid) {
      this.api.auth.login(this.form.value).subscribe((res) => {
        localStorage.setItem('credentials', res.username);

        this.router.navigate([PageRoutes.Categories]);
      });
    }
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: environment.googleLoginKey,
      callback: this.handleCredentialResponse.bind(this),
    });
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large' } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  handleCredentialResponse(response: any) {
    localStorage.setItem('credentials', JSON.stringify(response.credential));

    this.ngZone.run(() => {
      this.router.navigate([PageRoutes.TicTacToeMultiplayer]);
    });
  }
}
