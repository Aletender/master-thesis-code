import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { WebsocketService } from '../services/websocket.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  imports: [
    TaskCardComponent,
    CommonModule
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
  private subscriptions: Subscription = new Subscription();

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
          this.tasks[index] = updatedTask; // Aktualisiere die bestehende Aufgabe
        }
      })
    );

    this.subscriptions.add(
      this.websocketService.onTaskListUpdate().subscribe((updatedTasks: Task[]) => {
        this.tasks = updatedTasks.map(task => ({ ...task, isNew: false })); // Reset
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      console.log('Geladene Aufgaben:', tasks); // Debug-Ausgabe
      this.tasks = tasks;
    });
  }

  get filteredTasks(): Task[] {
    if (this.statuses.length === 0) return this.tasks;
    return this.tasks.filter(task => this.statuses.includes(task.status));
  }

  trackByTaskId(index: number, task: Task): string {
    return task.taskId; // Eindeutige ID des Tasks
  }

  onAnimationDone(event: AnimationEvent, task: Task): void {
    if (event.toState === 'void') {
      this.tasks = this.tasks.filter(t => t.taskId !== task.taskId);
    }
  }
}
