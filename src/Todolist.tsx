import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from './EditableSpun';
import {IconButton, Button, Checkbox} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

export type TasksType = {
  id: string
  isDone: boolean
  title: string
}

export type PropsType = {
  id: string
  title: string
  tasks: Array<TasksType>
  filter: FilterValueType
  addTask: (title: string, todolistId: string) => void
  removeTask: (id: string, todolistId: string) => void
  changeTasksFilter: (value: FilterValueType, todolistId: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTaskTitle: (taskID: string, newTitle: string, todolistId: string)=> void
  changeTodolistTitle: (todolistId: string, newTitle: string)=> void
}

export function Todolist(props: PropsType) {


  const removeTodolistHandler = () => {props.removeTodolist(props.id)}

  const selectAllHandler = () => {
    props.changeTasksFilter("all", props.id)
  }
  const selectCompletedHandler = () => {
    props.changeTasksFilter("completed", props.id)
  }
  const selectActiveHandler = () => {
    props.changeTasksFilter("active", props.id)
  }

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }
  const onChangeTodolistTitleHandler = (newTitle: string)=> {
    props.changeTodolistTitle(props.id, newTitle)

  }

  return (
     <div>
       <h3><EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler}/>
         <IconButton onClick={removeTodolistHandler}>
           <Delete/>
         </IconButton></h3>
       <AddItemForm
          addItem={addTask}
       />

       {props.tasks.map(t => {

         const removeTaskHandler = () => {
           props.removeTask(t.id, props.id)
         }
         const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
           props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
         }

         const changeTaskTitleHandler = (newTitle: string) => {
           props.changeTaskTitle(t.id, newTitle, props.id)
         }



         return <div key={t.id} className={t.isDone ? "is-done" : ""}>
           <IconButton onClick={removeTaskHandler}>
             <Delete/>
           </IconButton>
           <Checkbox onChange={changeTaskStatusHandler}
                     checked={t.isDone}
                     color={'default'}
           />
           <EditableSpan
              title={t.title}
              onChange={changeTaskTitleHandler}
           />
         </div>
       })}

       <div>
         <Button variant={props.filter === "all" ? "contained" : "text"}
                 onClick={selectAllHandler}>All</Button>
         <Button variant={props.filter === "active" ? "contained" : "text"}
                 onClick={selectActiveHandler}>Active
         </Button>
         <Button variant={props.filter === "completed" ? "contained" : "text"}
                 onClick={selectCompletedHandler}>Completed
         </Button>
       </div>
     </div>
  );
}

