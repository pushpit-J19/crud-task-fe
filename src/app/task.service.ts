import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import TaskListModel from './models/taskListModel';
import TaskModel from './models/taskModel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService: ApiConfigService) { }

  // method to fetch all task lists
  // http://localhost:3000/tasklists
  getAllTaskLists(): Observable<TaskListModel[]>{
    return this.apiConfigService.getTaskLists("tasklists");
  }

  getAllTasks(taskListId: string): Observable<TaskModel[]>{
    return this.apiConfigService.getTasks(`tasklists/${taskListId}`);
  }

  // create a task list bucket
  // http://localhost:3000/tasklists 
  createTaskList (title: string): Observable <TaskListModel>{
    let data = { 'title' : title };
    return this.apiConfigService.post("tasklists", data);
  }

  // to fetch all  tasks inside a task list
  // http://localhost:3000/tasklists/61ccab96109accafd52c7906/tasks
  getAllTasksForATaskList(tasklistId: string){
    return this.apiConfigService.getTasks( `tasklists/${tasklistId}/tasks`);
  }

  // create a task inside a particular task list
  // http://localhost:3000/tasklists/61ccab9c109accafd52c7908/tasks
  createTaskInsideATaskList(tasklistId: string, title: string){
    return this.apiConfigService.post(`tasklists/${tasklistId}/tasks`, { title })
  }

  // delete a task list
  // http://localhost:3000/tasklists/61ccab96109accafd52c7906
  deleteTaskList(taskListId: string): Observable<TaskListModel>{
    return this.apiConfigService.deleteTaskList(`tasklists/${taskListId}`);
  }
  
  // delete a task inside a particular task list
  // http://localhost:3000/tasklists/tasklistId/tasks/taskId
  deleteTaskInsideATaskList(taskListId: string, taskId: string): Observable<TaskModel>{
    return this.apiConfigService.deleteTask(`tasklists/${taskListId}/tasks/${taskId}`);
  }

  // update task status of completed or not
  updateTaskStatus(taskListId: string, taskObj: TaskModel){
    let data = {
      'completed': !taskObj.completed
    };
    return this.apiConfigService.patch(`tasklists/${taskListId}/tasks/${taskObj._id}`, data);
  }

}
