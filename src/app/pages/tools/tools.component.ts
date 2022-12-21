import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ShowAlert } from '@/store/alert/alert.actions';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  showAlert() {
    const types: any = ['Success', 'Error', 'Info', 'Warning'];

    this.store.dispatch(
      new ShowAlert({
        text: 'Random alert!',
        type: types[Math.floor(Math.random() * types.length)],
      })
    );
  }
}
