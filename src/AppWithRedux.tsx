import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
  addTodolistAC, addTodolistsTC,
  changeTodolistFilterAC,
  changeTodolistTitleAC, changeTodolistTitleTC, fetchTodolistsTC, FilterValueType,
  removeTodolistAC, removeTodolistsTC, TodolistDomainType
} from "./state/todolists-reducer";
import {
  addTaskAC,
  addTaskTC,
  changeTaskStatusAC, changeTaskStatusTC,
  changeTaskTitleAC,
  removeTaskAC,
  removeTaskTC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType, todolistsAPI} from "./api/todolists-api";
import {useAppDispatch} from "./hooks";


export type TaskStateType = {
  [key: string]: Array<TaskType>
}

export function AppWithRedux() {
  console.log("app")
  const dispatch = useAppDispatch();

  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
  const tasksObj = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)


  useEffect(()=>{
    dispatch(fetchTodolistsTC());
  },[])

  const removeTask = useCallback(function (id: string, todolistId: string) {
    dispatch(removeTaskTC(id, todolistId))
  }, [])

  const addTask = useCallback(function addTask(title: string, todolistId: string) {
    dispatch(addTaskTC(title, todolistId))
  }, [])

  const changeTaskStatus = useCallback(function changeTaskStatus(taskID: string, status: TaskStatuses, todolistId: string) {
    dispatch(changeTaskStatusTC(taskID, status, todolistId))
  }, [dispatch])

  const changeTaskTitle = useCallback(function changeTaskTitle(taskID: string, newTitle: string, todolistId: string) {
    dispatch(changeTaskTitleAC(taskID, newTitle, todolistId))
  }, [dispatch])

  const changeTodolistTitle = useCallback(function changeTodolistTitle(todolostId: string, newTitle: string) {
    dispatch(changeTodolistTitleTC(todolostId, newTitle))
  }, [])

  const changeTasksFilter = useCallback(function changeTasksFilter(todolistId: string, value: FilterValueType) {
    dispatch(changeTodolistFilterAC(todolistId, value))
  }, [dispatch])

  const removeTodolist = useCallback(function removeTodolist(todolistId: string) {
    dispatch(removeTodolistsTC(todolistId));
  }, [])

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistsTC(title))
  }, [])

  return (
     <div className="App">
       <AppBar position="static"
               color={'default'}

       >
         <Toolbar>
           <IconButton
              edge="start"
              color="default"
              aria-label="menu">
             <Menu/>
           </IconButton>
           <Typography variant="h6">
             settings
           </Typography>
           <Button color="default" style={{padding: '25px'}}>All Todolists</Button>
         </Toolbar>
       </AppBar>
       <Container fixed>
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
                      id={tl.id}
                      title={tl.title}
                      tasks={tasksForTodolist}
                      filter={tl.filter}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeTasksFilter={changeTasksFilter}
                      changeTaskStatus={changeTaskStatus}
                      removeTodolist={removeTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTodolistTitle={changeTodolistTitle}
                   />
                 </Paper>
               </Grid>
             })
           }
         </Grid>
       </Container>
     </div>
  );
}



