import { Component, Input } from '@angular/core';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { TaskActionsComponent } from '../task-actions/task-actions.component';
import { QrCodeComponent } from '../qr-code/qr-code.component';
import { WarningIconComponent } from '../warning-icon/warning-icon.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  standalone: true,
  imports: [
    CommonModule,
    StatusBadgeComponent,
    TaskActionsComponent,
    QrCodeComponent,
    WarningIconComponent
  ],
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task!: Task;

  constructor(private bottomSheet: MatBottomSheet) {}

  onViewDetails(): void {
    this.bottomSheet.open(TaskDetailsComponent, {
      data: { task: this.task }
    });
  }

  onEditTask(id: string): void {
    console.log('Bearbeiten für Task:', id);
  }

  showQr(): void {
    console.log('Show QR for:', this.task.taskId);
  }
}
