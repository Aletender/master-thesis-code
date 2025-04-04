import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskListComponent} from './overview/task-list/task-list.component';
import {OverviewPageComponent} from './overview/overview-page/overview-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent, OverviewPageComponent],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'thesis-frontend';
}
