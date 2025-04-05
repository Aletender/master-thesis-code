// file: frontend/thesis-frontend/src/app/overview/task-actions/task-actions.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaskStatus } from '../models/task.model';
import { TASK_STATUS_ROUTES } from '../models/task-status-routes';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-actions.component.html',
  styleUrls: ['./task-actions.component.scss']
})
export class TaskActionsComponent {
  @Input() taskId!: string;
  @Input() taskStatus!: TaskStatus;

  @Output() viewDetails = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<string>();

  constructor(private router: Router, private dialog: MatDialog, private taskService: TaskService) {}

  onView(): void {
    this.viewDetails.emit(this.taskId);
  }

  onEdit(): void {
    if (this.taskStatus === TaskStatus.R4_PICKUP) {
      this.router.navigate([`edit/pickup/${this.taskId}`]);
      return;
    }

    if (this.taskStatus === TaskStatus.IN_PICKING) {
      this.router.navigate([`edit/picking/${this.taskId}`]);
      return;
    }

    if (this.taskStatus === TaskStatus.IN_PACKING) {
      this.router.navigate([`edit/packing/${this.taskId}`]);
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { action: this.taskStatus === TaskStatus.READY4PICKING ? 'Picken' : 'Packing' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let newStatus: TaskStatus;
        if (this.taskStatus === TaskStatus.READY4PICKING) {
          newStatus = TaskStatus.IN_PICKING;
        } else if (this.taskStatus === TaskStatus.PICKED) {
          newStatus = TaskStatus.IN_PACKING;
        } else {
          return;
        }

        this.taskService.updateTask(this.taskId, { status: newStatus }).subscribe(() => {
          this.taskStatus = newStatus;
          const editRoute = TASK_STATUS_ROUTES[this.taskStatus];
          if (editRoute) {
            this.router.navigate([`${editRoute}/${this.taskId}`]);
          } else {
            console.error(`No route defined for status: ${this.taskStatus}`);
          }
        });
      }
    });
  }
}
