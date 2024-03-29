import React, {useCallback, useEffect} from "react";
import {
  addTodolistsTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValueType,
  removeTodolistsTC,
  TodolistDomainType
} from "../../state/todolists-reducer";
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskTC} from "../../state/tasks-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {TaskStatuses} from "../../api/todolists-api";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Grid, Paper} from "@mui/material";
import {Redirect} from "react-router-dom";

export type TodolistsListPropsType = {
  demo?: boolean
}
export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo = false}) => {
  console.log('Todolist_List')
  const dispatch = useAppDispatch();
  const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
  const tasksObj = useAppSelector<TaskStateType>(state => state.tasks)
  const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)


  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    dispatch(fetchTodolistsTC());
  }, [])

  const removeTask = useCallback(function (id: string, todolistId: string) {
    dispatch(removeTaskTC(id, todolistId))
  }, [])

  const addTask = useCallback(function addTask(title: string, todolistId: string) {
    console.log(title)
    console.log(todolistId)
    dispatch(addTaskTC(title, todolistId))
  }, [])

  const changeTaskStatus = useCallback(function changeTaskStatus(taskID: string, status: TaskStatuses, todolistId: string) {
    dispatch(updateTaskTC(taskID, {status}, todolistId))
  }, [])

  const changeTaskTitle = useCallback(function changeTaskTitle(taskID: string, newTitle: string, todolistId: string) {
    dispatch(updateTaskTC(taskID, {title: newTitle}, todolistId))
  }, [])

  const changeTodolistTitle = useCallback(function changeTodolistTitle(todolostId: string, newTitle: string) {
    dispatch(changeTodolistTitleTC(todolostId, newTitle))
  }, [])

  const changeTasksFilter = useCallback(function changeTasksFilter(todolistId: string, value: FilterValueType) {
    dispatch(changeTodolistFilterAC(todolistId, value))
  }, [])

  const removeTodolist = useCallback(function removeTodolist(todolistId: string) {
    dispatch(removeTodolistsTC(todolistId));
  }, [])

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistsTC(title))
  }, [])

  if (!isLoggedIn) {
    return <Redirect to={'/login'}/>
  }

  return <>
    <Grid container
          style={{padding: '25px'}}>
      <AddItemForm addItem={addTodolist}/>
    </Grid>
    <Grid container
          style={{padding: '25px'}}
    >
      {
        todolists.map(tl => {

          let tasksForTodolist = tasksObj[tl.id];

          return <Grid item
                       style={{padding: '10px'}}
          >
            <Paper style={{padding: '25px'}}
                   elevation={5}
            >
              <Todolist
                 key={tl.id}
                 todolist={tl}
                 tasks={tasksForTodolist}
                 addTask={addTask}
                 removeTask={removeTask}
                 changeTasksFilter={changeTasksFilter}
                 changeTaskStatus={changeTaskStatus}
                 removeTodolist={removeTodolist}
                 changeTaskTitle={changeTaskTitle}
                 changeTodolistTitle={changeTodolistTitle}
                 demo={demo}
              />
            </Paper>
          </Grid>
        })
      }
    </Grid>
  </>

}