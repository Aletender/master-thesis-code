import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { WebsocketService } from '../services/websocket.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  imports: [
    TaskCardComponent,
    CommonModule,
    FilterBarComponent
  ],
  styleUrls: ['./task-list.component.scss'],
  animations: [
    trigger('taskAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() statuses: TaskStatus[] = [];
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  private subscriptions: Subscription = new Subscription();
  private searchText: string = '';

  constructor(
    private taskService: TaskService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.loadTasks();

    this.subscriptions.add(
      this.websocketService.onTaskUpdate().subscribe((updatedTask: Task) => {
        const index = this.tasks.findIndex(task => task.taskId === updatedTask.taskId);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
        this.applyFilters();
      })
    );

    this.subscriptions.add(
      this.websocketService.onTaskListUpdate().subscribe((updatedTasks: Task[]) => {
        this.tasks = updatedTasks.map(task => ({ ...task, isNew: false }));
        this.applyFilters();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilters();
    });
  }

  onStatusFilterChange(statuses: TaskStatus[]): void {
    this.statuses = statuses;
    this.applyFilters();
  }

  onTextFilterChange(searchText: string): void {
    this.searchText = searchText;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesStatus = this.statuses.length === 0 || this.statuses.includes(task.status);
      const matchesText = !this.searchText ||
        task.taskId.toLowerCase().includes(this.searchText) ||
        task.customerName.toLowerCase().includes(this.searchText);
      return matchesStatus && matchesText;
    });
  }

  trackByTaskId(index: number, task: Task): string {
    return task.taskId;
  }

  onAnimationDone(event: AnimationEvent, task: Task): void {
    if (event.toState === 'void') {
      this.tasks = this.tasks.filter(t => t.taskId !== task.taskId);
    }
  }
}
