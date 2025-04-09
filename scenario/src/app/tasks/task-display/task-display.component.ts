// No need to change this file
import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { TaskActions, TaskAndId } from '../../task-types';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TimeFormatPipe } from "../../util.pipe";
import { TaskCreateComponent } from "../task-create/task-create.component";
import { TaskDeleteComponent } from "../task-delete/task-delete.component";
import { TaskUpdateComponent } from "../task-update/task-update.component";

@Component({
  selector: 'app-task-display',
  standalone: true,
  imports: [AsyncPipe, TimeFormatPipe, CommonModule, TaskCreateComponent, TaskDeleteComponent, TaskUpdateComponent],
  templateUrl: './task-display.component.html',
})
export class TaskDisplayComponent {
  protected tasks$: Observable<Array<TaskAndId>>;
  protected modalIsActive: boolean = false;
  protected taskActions : TaskActions = null;
  protected taskId : string | null = "";

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks()
  }

  takeAction(action: TaskActions, id?: string | null){
    this.taskId = id ?? null; 
    this.modalIsActive = true;
    this.taskActions = action;
  }

  closeModal(){
    this.modalIsActive = false;
  }
}
