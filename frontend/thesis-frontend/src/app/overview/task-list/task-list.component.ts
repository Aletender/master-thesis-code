import { Component, Input, OnInit } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';

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
export class TaskListComponent implements OnInit {
  @Input() statuses: TaskStatus[] = [];
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  get filteredTasks(): Task[] {
    if (this.statuses.length === 0) return this.tasks;
    return this.tasks.filter(task => this.statuses.includes(task.status));
  }
}
