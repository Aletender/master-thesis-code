import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;

  constructor() {
    // Verbindung zum WebSocket-Server herstellen
    this.socket = io('http://localhost:3000'); // URL des Backends
  }

  // Echtzeit-Updates für einzelne Aufgaben
  onTaskUpdate(): Observable<Task> {
    return new Observable<Task>(observer => {
      this.socket.on('orderUpdated', (updatedTask: Task) => {
        observer.next(updatedTask);
      });
    });
  }

  // Echtzeit-Updates für die Aufgabenliste
  onTaskListUpdate(): Observable<Task[]> {
    return new Observable<Task[]>(observer => {
      this.socket.on('orderListUpdated', (updatedTasks: Task[]) => {
        observer.next(updatedTasks);
      });
    });
  }

  // Verbindung trennen
  disconnect(): void {
    this.socket.disconnect();
  }
}
