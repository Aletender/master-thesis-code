import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-actions.component.html',
  styleUrls: ['./task-actions.component.scss']
})
export class TaskActionsComponent {
  @Input() taskId!: string;

  @Output() viewDetails = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<string>();

  onView(): void {
    this.viewDetails.emit(this.taskId);
  }

  onEdit(): void {
    this.editTask.emit(this.taskId);
  }
}
