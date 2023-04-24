import React, {useCallback, useEffect} from "react";
import '../../../app/App.css';
import {AddItemForm} from "../../../components/addItemForm/AddItemForm";
import {EditableSpan} from '../../../components/editableSpun/EditableSpun';
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {fetchTasksTC} from "../../../state/tasks-reducer";
import {useAppDispatch} from "../../../app/hooks";
import {FilterValueType, TodolistDomainType} from "../../../state/todolists-reducer";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


export type PropsType = {
  todolist: TodolistDomainType
  tasks: Array<TaskType>
  addTask: (title: string, todolistId: string) => void
  removeTask: (id: string, todolistId: string) => void
  changeTasksFilter: (todolistId: string, value: FilterValueType) => void
  changeTaskStatus: (taskID: string, status: TaskStatuses, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTaskTitle: (taskID: string, newTitle: string, todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
  demo?: boolean
}

export const Todolist = React.memo(function Todolist({demo = false, ...props}: PropsType) {
  console.log("todolist")

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (demo) {
      return;
    }
    dispatch(fetchTasksTC(props.todolist.id))
  }, [])

  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolist.id)
  }

  const selectAllHandler = useCallback(() => {
    props.changeTasksFilter(props.todolist.id, "all")
  }, [props.changeTasksFilter, props.todolist.id])
  const selectCompletedHandler = useCallback(() => {
    props.changeTasksFilter(props.todolist.id, "completed")
  }, [props.changeTasksFilter, props.todolist.id])
  const selectActiveHandler = useCallback(() => {
    props.changeTasksFilter(props.todolist.id, "active")
  }, [props.changeTasksFilter, props.todolist.id])

  const addTask = useCallback((title: string) => {
    console.log(title)
    console.log(props.todolist.id)
    props.addTask(title, props.todolist.id)
  }, [props.addTask, props.todolist.id])

  const onChangeTodolistTitleHandler = useCallback((newTitle: string) => {
    props.changeTodolistTitle(props.todolist.id, newTitle)
  }, [props.changeTodolistTitle, props.todolist.id])

  let tasksForTodolist = props.tasks;

  if (props.todolist.filter === "completed") {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
  }
  if (props.todolist.filter === "active") {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
  }

  return (
     <div>
       <h3><EditableSpan title={props.todolist.title} onChange={onChangeTodolistTitleHandler}/>
         <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === 'loading'}>
           <Delete/>
         </IconButton></h3>
       <AddItemForm addItem={addTask}
                    disabled={props.todolist.entityStatus === 'loading'}
       />

       {tasksForTodolist.map(t => <Task removeTask={props.removeTask}
                                        changeTaskStatus={props.changeTaskStatus}
                                        changeTaskTitle={props.changeTaskTitle}
                                        t={t}
                                        todolistID={props.todolist.id}
                                        key={t.id}
          />
       )}

       <div>
         <Button variant={props.todolist.filter === "all" ? "contained" : "text"}
                 onClick={selectAllHandler}>All</Button>
         <Button variant={props.todolist.filter === "active" ? "contained" : "text"}
                 onClick={selectActiveHandler}>Active
         </Button>
         <Button variant={props.todolist.filter === "completed" ? "contained" : "text"}
                 onClick={selectCompletedHandler}>Completed
         </Button>
       </div>
     </div>
  );
})


