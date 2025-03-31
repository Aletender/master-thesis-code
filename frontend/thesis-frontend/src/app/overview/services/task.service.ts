import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TaskFilter} from '../models/task-filter.model';
import {Task} from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(filter?: TaskFilter, page = 1, pageSize = 20): Observable<Task[]> {
    // Beispiel-URL (je nach API)
    const params = new HttpParams()
      .set('page', page)
      .set('size', pageSize)
    // eventuell weitere Filter hinzufügen

    return this.http.get<Task[]>('/api/tasks', { params });
  }
}
