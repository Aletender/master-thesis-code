import { Component } from '@angular/core';
import { TaskStatus } from '../models/task.model';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [FilterBarComponent, TaskListComponent],
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent {
  selectedStatuses: TaskStatus[] = [];

  onFilterChange(statuses: TaskStatus[]): void {
    this.selectedStatuses = statuses;
    console.log('Aktive Filter:', this.selectedStatuses);
  }
}
