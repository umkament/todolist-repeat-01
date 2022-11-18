import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import { Menu } from '@material-ui/icons';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValueType = "all" | "active" | "completed"

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValueType
}
export type TaskStateType = {
  [key: string]: Array<TasksType>
}

export function AppWithRedux() {

  const dispatch = useDispatch();

  const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
  const tasksObj = useSelector<AppRootState, TaskStateType>(state => state.tasks)


  function removeTask (id: string, todolistId: string) {
    dispatch(removeTaskAC(id, todolistId))
  }

  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(title, todolistId))
  }

  function changeTaskStatus(taskID: string, isDone:boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(taskID,isDone, todolistId))
  }

  function changeTaskTitle(taskID: string, newTitle: string, todolistId: string) {
    dispatch(changeTaskTitleAC(taskID, newTitle, todolistId))
  }

  function changeTodolistTitle(todolostId: string, newTitle: string) {
    dispatch(changeTodolistTitleAC(todolostId,newTitle))
  }

  function changeTasksFilter (value: FilterValueType, todolistId: string) {
    dispatch(changeTodolistFilterAC(value, todolistId))
  }

  function removeTodolist(todolistId: string) {
    dispatch(removeTodolistAC(todolistId));
  }

  function addTodolist (title: string) {
    dispatch(addTodolistAC(title))
  }

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
             <Menu />
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
             todolists.map(tl =>{

               let tasksForTodolist = tasksObj[tl.id];
               if (tl.filter==="completed") {
                 tasksForTodolist = tasksForTodolist.filter(t=>t.isDone)
               }
               if (tl.filter==="active") {
                 tasksForTodolist = tasksForTodolist.filter(t=>!t.isDone)
               }
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



