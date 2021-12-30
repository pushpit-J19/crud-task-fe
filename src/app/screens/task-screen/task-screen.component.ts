import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import TaskListModel from 'src/app/models/taskListModel';
import TaskModel from 'src/app/models/taskModel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent implements OnInit {

  taskLists: TaskListModel[] = [];
  tasks: TaskModel[] = [];
  taskListId: string = '';

  constructor(
    private taskService: TaskService,
    private activatedRoute : ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    // this method is called when the component is ready to be loaded
    this.taskService.getAllTaskLists()
      .subscribe(allTaskLists =>{ 
        this.taskLists = allTaskLists
        // Route to show the tasks of first item when page loads
        //this.router.navigate(["task-list", this.taskLists[0]['_id']]);
      } );


    this.activatedRoute.params.subscribe(
      (params: Params)=> {
        this.taskListId = params['taskListId'];
        if(this.taskListId){
          this.taskService.getAllTasksForATaskList(this.taskListId).subscribe(
            (tasks: TaskModel[]) => this.tasks = tasks
          )
        }
      }
    );
  }



  taskClicked(task: TaskModel){
    this.taskService.updateTaskStatus(this.taskListId, task)
    .subscribe(
      () =>{task.completed = !task.completed;}
    );
  }
  deleteTask(task: TaskModel){
    this.taskService.deleteTaskInsideATaskList(this.taskListId, task._id)
    .subscribe((deletedTask:TaskModel)=>{
      this.tasks = this.tasks.filter(t => t._id != deletedTask._id);

    });
  }
  deleteTaskList(tasklist: TaskListModel){
    this.taskService.deleteTaskList(tasklist._id)
    .subscribe(() => {
      this.taskLists = this.taskLists.filter(tl => tl._id != tasklist._id);
    });
  }
  addNewTask(){
    if(this.taskListId){
      // route the user to task screen for the selected task list
      this.router.navigate(["./new-task"], {relativeTo: this.activatedRoute})
    }else{
      alert("Select a task list");
      return;
    }
  }

}
