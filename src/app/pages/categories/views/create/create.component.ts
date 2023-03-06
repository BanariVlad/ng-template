import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.min(3)]],
    surname: ['', [Validators.required, Validators.min(3)]],
    email: ['', [Validators.required, Validators.email]],
    email_confirm: ['', [Validators.required, Validators.email]],
  });
  constructor(protected fb: FormBuilder) {}

  ngOnInit(): void {}

  submit() {
    this.form.markAllAsTouched();

    console.log(this.form);
  }
}
