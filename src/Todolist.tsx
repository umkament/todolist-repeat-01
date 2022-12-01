import React, {useCallback} from "react";
import {FilterValueType} from "./App";
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from './EditableSpun';
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

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

export const Todolist = React.memo( function Todolist(props: PropsType) {
  console.log("todolist")
  const removeTodolistHandler = () => {props.removeTodolist(props.id)}

  const selectAllHandler = useCallback( () => {
    props.changeTasksFilter("all", props.id)
  }, [props.changeTasksFilter, props.id])
  const selectCompletedHandler = useCallback( () => {
    props.changeTasksFilter("completed", props.id)
  }, [props.changeTasksFilter, props.id])
  const selectActiveHandler = useCallback( () => {
    props.changeTasksFilter("active", props.id)
  }, [props.changeTasksFilter, props.id])

  const addTask = useCallback( (title: string) => {
    props.addTask(title, props.id)
  }, [props.addTask, props.id])

  const onChangeTodolistTitleHandler = useCallback( (newTitle: string)=> {
    props.changeTodolistTitle(props.id, newTitle)
  }, [props.changeTodolistTitle, props.id])

  let tasksForTodolist = props.tasks;

  if (props.filter==="completed") {
    tasksForTodolist = props.tasks.filter(t=>t.isDone)
  }
  if (props.filter==="active") {
    tasksForTodolist = props.tasks.filter(t=>!t.isDone)
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

       {props.tasks.map(t => <Task removeTask={props.removeTask}
                                   changeTaskStatus={props.changeTaskStatus}
                                   changeTaskTitle={props.changeTaskTitle}
                                   t={t}
                                   todolistID={props.id}
                                   key={t.id}
          />


       )}

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
})


