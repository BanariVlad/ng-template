import { Component, OnInit } from '@angular/core';
import { CreateComponent } from '@/pages/categories/views/create/create.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent extends CreateComponent implements OnInit {
  constructor(override fb: FormBuilder) {
    super(fb);
  }

  override ngOnInit(): void {}

  override submit() {
    this.form.markAllAsTouched();

    console.log('from edit', this.form);
  }
}
