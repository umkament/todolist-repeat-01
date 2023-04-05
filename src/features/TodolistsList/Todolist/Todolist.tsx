import React, {useCallback, useEffect} from "react";
import '../../../app/App.css';
import {AddItemForm} from "../../../components/addItemForm/AddItemForm";
import {EditableSpan} from '../../../components/editableSpun/EditableSpun';
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {fetchTasksTC} from "../../../state/tasks-reducer";
import {useAppDispatch} from "../../../app/hooks";
import {FilterValueType} from "../../../state/todolists-reducer";


export type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValueType
  addTask: (title: string, todolistId: string) => void
  removeTask: (id: string, todolistId: string) => void
  changeTasksFilter: (todolistId: string, value: FilterValueType) => void
  changeTaskStatus: (taskID: string, status: TaskStatuses, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTaskTitle: (taskID: string, newTitle: string, todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist = React.memo(function Todolist(props: PropsType) {
  console.log("todolist")
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(fetchTasksTC(props.id))
  }, [])

  const removeTodolistHandler = () => {
    props.removeTodolist(props.id)
  }

  const selectAllHandler = useCallback(() => {
    props.changeTasksFilter(props.id, "all")
  }, [props.changeTasksFilter, props.id])
  const selectCompletedHandler = useCallback(() => {
    props.changeTasksFilter(props.id, "completed")
  }, [props.changeTasksFilter, props.id])
  const selectActiveHandler = useCallback(() => {
    props.changeTasksFilter(props.id, "active")
  }, [props.changeTasksFilter, props.id])

  const addTask = useCallback((title: string) => {
    console.log(title)
    console.log(props.id)
    props.addTask(title, props.id)
  }, [props.addTask, props.id])

  const onChangeTodolistTitleHandler = useCallback((newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }, [props.changeTodolistTitle, props.id])

  let tasksForTodolist = props.tasks;

  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
  }
  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
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

       {tasksForTodolist.map(t => <Task removeTask={props.removeTask}
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


