import {Component, Input} from '@angular/core';
import {Task, TASK_STATUS_META} from '../models/task.model';
import {NgIf} from '@angular/common';
import { CommonModule } from '@angular/common';
import {StatusBadgeComponent} from '../status-badge/status-badge.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    StatusBadgeComponent
  ],
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task!: Task;
}
