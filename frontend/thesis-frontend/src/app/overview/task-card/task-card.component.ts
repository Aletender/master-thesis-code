import { Component, Input } from '@angular/core';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { TaskActionsComponent } from '../task-actions/task-actions.component';
import { QrCodeComponent } from '../qr-code/qr-code.component';
import { WarningIconComponent } from '../warning-icon/warning-icon.component';

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

  onViewDetails(id: string): void {
    console.log('Details für Task:', id);
  }

  onEditTask(id: string): void {
    console.log('Bearbeiten für Task:', id);
  }

  showQr(): void {
    console.log('Show QR for:', this.task.taskId);
  }
}
