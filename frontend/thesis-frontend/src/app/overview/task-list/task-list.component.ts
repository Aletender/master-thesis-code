import {Component} from '@angular/core';
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
  // Mockdaten zur Anzeige
  tasks: Task[] = [
    {
      id: 'FSCJS12A',
      customerName: 'Max Mustermann',
      startDate: '2025-03-30',
      endDate: '2025-03-31',
      status: TaskStatus.IN_PACKING,
      hasWarning: true
    },
    {
      id: 'ABCD1234',
      customerName: 'Erika Musterfrau',
      startDate: '2025-03-30',
      endDate: '2025-04-01',
      status: TaskStatus.CANCELED
    },
    {
      id: 'XYZ7890',
      customerName: 'John Doe',
      startDate: '2025-03-29',
      endDate: '2025-03-30',
      status: TaskStatus.R4_PICKUP,
      hasWarning: false
    }
  ];
}
