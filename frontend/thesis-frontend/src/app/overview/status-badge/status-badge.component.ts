import {Component, Input} from '@angular/core';
import {TASK_STATUS_META, TaskStatus} from '../models/task.model';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-status-badge',
  imports: [
    NgClass
  ],
  templateUrl: './status-badge.component.html',
  standalone: true,
  styleUrl: './status-badge.component.scss'
})
export class StatusBadgeComponent {
  @Input() status!: TaskStatus;

  get label(): string {
    return TASK_STATUS_META[this.status]?.label ?? this.status;
  }

  get colorClass(): string {
    return TASK_STATUS_META[this.status]?.colorClass ?? 'status-gray';
  }
}
