import { ApiService } from '@/api/api.service';
import { User } from '@/ts/interfaces';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'actions'];
  dataSource$: Observable<User[]>;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.dataSource$ = this.api.users.getAll();
  }

  public navigateToUser(id: number | string) {
    this.router.navigate(['/categories/edit', id]);
  }

  public deleteUser(id: number | string) {
    this.api.users.deleteUser(id).subscribe();
  }
}
