// file: frontend/thesis-frontend/src/app/overview/edit-task/packing-view/packing-view.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-packing-view',
  templateUrl: './packing-view.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./packing-view.component.scss']
})
export class PackingViewComponent implements OnInit {
  task: Task | undefined;

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const taskId = params['id'];
      this.loadTask(taskId);
    });
  }

  loadTask(taskId: string): void {
    this.taskService.getTask(taskId).subscribe(task => {
      this.task = task;
    });
  }

  save(): void {
    if (this.task) {
      this.taskService.updateTask(this.task.taskId, this.task).subscribe(() => {
        // Handle successful save
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  markAsPacked(): void {
    if (this.task) {
      this.task.status = TaskStatus.PACKED;
      this.taskService.updateTask(this.task.taskId, this.task).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
