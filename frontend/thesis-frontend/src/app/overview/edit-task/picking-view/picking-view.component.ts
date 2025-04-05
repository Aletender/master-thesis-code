import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-picking-view',
  templateUrl: './picking-view.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./picking-view.component.scss']
})
export class PickingViewComponent implements OnInit {
  task!: Task;
  items: { name: string, quantity: number }[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const taskId = params['id'];
      this.loadTask(taskId);
    });
  }

  loadTask(taskId: string): void {
    this.taskService.getTask(taskId).subscribe(task => {
      this.task = task;
      this.loadItems();
    });
  }

  loadItems(): void {
    // Hier wird später die Logik zum Laden der Items vom Backend hinzugefügt
    this.items = [
      { name: 'Item 1', quantity: 2 },
      { name: 'Item 2', quantity: 5 },
      { name: 'Item 3', quantity: 1 }
    ];
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  markAsPicked(): void {
    this.task.status = TaskStatus.PICKED;
    this.taskService.updateTask(this.task.taskId, this.task).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
