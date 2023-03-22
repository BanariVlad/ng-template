import { ApiService } from '@/api/api.service';
import { CreateComponent } from '@/pages/categories/views/create/create.component';
import { User } from '@/ts/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent extends CreateComponent implements OnInit {
  constructor(
    override fb: FormBuilder,
    override api: ApiService,
    override router: Router,
    private route: ActivatedRoute
  ) {
    super(fb, api, router);
  }

  ngOnInit(): void {
    this.api.users
      .getById(this.route.snapshot.paramMap.get('id') as string)
      .subscribe((user: User) => {
        this.form.patchValue(user);
      });
  }

  override submit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.api.users
        .updateUser(
          this.route.snapshot.paramMap.get('id') as string,
          this.form.value
        )
        .subscribe(() => {
          this.router.navigate(['/categories']);
        });
    }
  }
}
