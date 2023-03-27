import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.min(8)]),
    });
  }

  submit() {
    this.form.markAsTouched();

    if (this.form.valid) {
      // this.config.logIn(this.form.value).subscribe(async (_) => {
      //   this.config.getUser().subscribe();
      //   await this.router.navigateByUrl('/dashboard');
      // });
    }
  }

  ngOnInit(): void {}
}
