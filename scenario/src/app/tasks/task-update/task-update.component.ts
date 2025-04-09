import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { Task } from '../../task-types';

@Component({
  selector: 'app-task-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-update.component.html',
})
export class TaskUpdateComponent implements OnChanges {
  @Output() closeCompEvent : EventEmitter<boolean> = new EventEmitter<boolean>();
    protected task: Task = {
      name: '',
      due: '',
      description: '',
      complete: false,
    };

    protected debounceInterval! : ReturnType<typeof setTimeout>

    @Input() id:string | null = "";
  
    constructor(private taskService: TaskService) { }

    ngOnChanges(changes: SimpleChanges): void {
      this.taskService.fetchTask(this.id).subscribe(task=>{
        
        this.task = {
          name: task.name,
          due: this.formatDate(new Date(task.due)),
          description: task.description,
          complete: task.complete,
        }
      });
    }

  
    protected onSubmit(): void {
      this.taskService.updateTask(this.id ,this.task)
      this.task = {
        name: '',
        due: new Date(),
        description: '',
        complete: false
      };
      this.id = "";
      this.closeCompEvent.emit(true);
    }

    protected onIdChange(): void {
      this.debounceInterval = setTimeout(()=>{
        clearInterval(this.debounceInterval);
          this.clearTask();
          this.taskService.fetchTask(this.id).subscribe(task=>{
            this.task = {
              name: task.name,
              due: this.formatDate(new Date(task.due)),
              description: task.description,
              complete: task.complete,
            }
          });
      }, 500) 
    }

    protected clearTask(){
      this.task ={
        name: '',
        due: '',
        description: '',
        complete: false,
      }
    }

    protected formatDate(date: Date): string {
      const yyyy = date.getFullYear();
      const mm = (date.getMonth() + 1).toString().padStart(2, '0');
      const dd = date.getDate().toString().padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }
}
