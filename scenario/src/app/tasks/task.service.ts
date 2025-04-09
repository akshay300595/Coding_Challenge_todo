import { Injectable } from '@angular/core';
import { Task, TaskAndId } from '../task-types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5200/api/tasks'
  private tasksSubject = new BehaviorSubject<Array<TaskAndId>>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Array<TaskAndId>> {
    this.refreshTasks()
    return this.tasks$
  }

  refreshTasks() {
    this.http.get<Array<TaskAndId>>(this.apiUrl).subscribe(
      tasks => this.tasksSubject.next(tasks));
  }

  fetchTask(id: string | null): Observable<TaskAndId>{
    return this.http.get<TaskAndId>(`${this.apiUrl}/${id ?? ''}`)
    }


  updateTask(id: string | null, task: Task): void { 
    this.http.put<TaskAndId>(this.apiUrl, {_id: id ?? '', task}).subscribe({
      next: () => {
        this.refreshTasks()
      }
    })
  }

  createTask(newTask: Task): void {
    this.http.post(this.apiUrl, { task: newTask }).subscribe({
      next: () => {
        this.refreshTasks()
      }
    })
  }

  deleteTask(index: string): void {
    this.http.delete(`${this.apiUrl}/${index}`).subscribe({
      next: () => {
        this.refreshTasks()
      }
    })
  }
}
