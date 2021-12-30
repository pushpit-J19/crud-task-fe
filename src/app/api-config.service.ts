import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import TaskListModel from './models/taskListModel';
import TaskModel from './models/taskModel';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  API_BASE_URL = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

// API CALLS TO BACK END

  // get API call for tasklists
  getTaskLists(url: string){
    return this.httpClient.get<TaskListModel[]>(`${this.API_BASE_URL}/${url}`);
  }

  // get API call
  getTasks(url: string){
    return this.httpClient.get<TaskModel[]>(`${this.API_BASE_URL}/${url}`);
  }

  // post endpoint
  post(url: string, data: Object){
    return this.httpClient.post<TaskListModel>(`${this.API_BASE_URL}/${url}`, data);
  }

  // put endpoint
  put(url: string, data: Object){
    return this.httpClient.put(`${this.API_BASE_URL}/${url}`, data);
  }
  patch(url: string, data: Object){
    return this.httpClient.patch(`${this.API_BASE_URL}/${url}`, data);
  }

  // delete endpoint
  deleteTask(url: string){
    return this.httpClient.delete<TaskModel>(`${this.API_BASE_URL}/${url}`);
  }
  deleteTaskList(url: string){
    return this.httpClient.delete<TaskListModel>(`${this.API_BASE_URL}/${url}`);
  }

}
