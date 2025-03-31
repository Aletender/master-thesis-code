import {Component, Input} from '@angular/core';
import {Task, TaskStatus} from '../models/task.model';
import {TaskCardComponent} from '../task-card/task-card.component';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  imports: [
    TaskCardComponent,
    CommonModule
  ],
  styleUrl: './task-list.component.scss'
})

export class TaskListComponent {
  @Input() statuses: TaskStatus[] = [];

  get filteredTasks(): Task[] {
    if (this.statuses.length === 0) return this.tasks;

    return this.tasks.filter(task => this.statuses.includes(task.status));
  }

  tasks: Task[] = [
    {
      id: 'T001',
      customerName: 'Max Mustermann',
      startDate: '2025-03-30',
      endDate: '2025-04-01',
      status: TaskStatus.READY4PICKUP
    },
    {
      id: 'T002',
      customerName: 'Erika Musterfrau',
      startDate: '2025-03-28',
      endDate: '2025-03-30',
      status: TaskStatus.IN_PICKING,
      hasWarning: true
    },
    {
      id: 'T003',
      customerName: 'John Doe',
      startDate: '2025-03-29',
      endDate: '2025-03-30',
      status: TaskStatus.PICKED
    },
    {
      id: 'T004',
      customerName: 'Jane Smith',
      startDate: '2025-03-31',
      endDate: '2025-04-01',
      status: TaskStatus.IN_PACKING
    },
    {
      id: 'T005',
      customerName: 'Lars Becker',
      startDate: '2025-03-30',
      endDate: '2025-03-31',
      status: TaskStatus.PACKED
    },
    {
      id: 'T006',
      customerName: 'Anna Müller',
      startDate: '2025-03-27',
      endDate: '2025-03-28',
      status: TaskStatus.R4_PICKUP
    },
    {
      id: 'T007',
      customerName: 'Tom Tailor',
      startDate: '2025-03-26',
      endDate: '2025-03-27',
      status: TaskStatus.PICKED_UP
    },
    {
      id: 'T008',
      customerName: 'Klara Klein',
      startDate: '2025-03-25',
      endDate: '2025-03-26',
      status: TaskStatus.CANCELED,
      hasWarning: true
    }
  ];
}
