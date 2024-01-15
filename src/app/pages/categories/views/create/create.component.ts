import { ApiService } from '@/api/api.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  form: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected api: ApiService,
    protected router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.min(3)]],
      username: ['', [Validators.required, Validators.min(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
    });
  }

  submit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.api.users.createUser(this.form.value).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    }
  }
}
