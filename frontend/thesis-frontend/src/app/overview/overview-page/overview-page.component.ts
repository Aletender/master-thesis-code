import { Component } from '@angular/core';
import {TaskListComponent} from '../task-list/task-list.component';

@Component({
  selector: 'app-overview-page',
  imports: [
    TaskListComponent
  ],
  templateUrl: './overview-page.component.html',
  standalone: true,
  styleUrl: './overview-page.component.scss'
})
export class OverviewPageComponent {

}
