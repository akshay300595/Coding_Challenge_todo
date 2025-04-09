// No need to change this file
import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-delete',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-delete.component.html',
})
export class TaskDeleteComponent {
  @Output() closeCompEvent : EventEmitter<boolean> = new EventEmitter<boolean>();
  protected taskId: string = ''

  constructor(private taskService: TaskService) { }

  protected onSubmit(): void {
    this.taskService.deleteTask(this.taskId)
    this.taskId = ''
    this.closeCompEvent.emit(true);
  }
}
