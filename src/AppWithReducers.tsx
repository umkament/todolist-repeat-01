import React, {useReducer} from 'react';
/*
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";

export type FilterValueType = "all" | "active" | "completed"

export type TodolistType = {
  id: string,
  title: string
  filter: FilterValueType
}
export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {
  console.log('App rendered')

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    {id: todolistID1, title: "what to watch", filter: "all", addedDate: '', order: 0},
    {id: todolistID2, title: "list for to do", filter: "completed", addedDate: '', order: 0}
  ])

  let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistID1]: [
      {
        id: v1(),
        status: TaskStatuses.Completed,
        title: "interstellar",
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: todolistID1,
        order: 0,
        addedDate: ''
      },
      {
        id: v1(),
        status: TaskStatuses.New,
        title: "terminator",
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: todolistID1,
        order: 0,
        addedDate: ''
      },
      {
        id: v1(),
        status: TaskStatuses.Completed,
        title: "true detective",
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: todolistID1,
        order: 0,
        addedDate: ''
      },
      {
        id: v1(),
        status: TaskStatuses.New,
        title: "avatar",
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: todolistID1,
        order: 0,
        addedDate: ''
      }
    ],
    [todolistID2]: [
      {
        id: v1(),
        status: TaskStatuses.Completed,
        title: "вымыть руки",
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: todolistID2,
        order: 0,
        addedDate: ''
      },
      {
        id: v1(),
        status: TaskStatuses.New,
        title: "кушать",
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: todolistID2,
        order: 0,
        addedDate: ''
      },
      {
        id: v1(),
        status: TaskStatuses.Completed,
        title: "чистить зубы",
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: todolistID2,
        order: 0,
        addedDate: ''
      },
      {
        id: v1(),
        status: TaskStatuses.New,
        title: "спать",
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: todolistID2,
        order: 0,
        addedDate: ''
      }
    ]
  })

  function removeTask(id: string, todolistId: string) {
    dispatchToTasksReducer(removeTaskAC(id, todolistId))
  }

/!*  function addTask(title: string, todolistId: string) {
    dispatchToTasksReducer(addTaskAC(title, todolistId))
  }*!/

  function changeTaskStatus(taskID: string, status: TaskStatuses, todolistId: string) {
    dispatchToTasksReducer(changeTaskStatusAC(taskID, status, todolistId))
  }

  function changeTaskTitle(taskID: string, newTitle: string, todolistId: string) {
    dispatchToTasksReducer(changeTaskTitleAC(taskID, newTitle, todolistId))
  }

  function changeTodolistTitle(todolostId: string, newTitle: string) {
    dispatchToTodolistsReducer(changeTodolistTitleAC(todolostId, newTitle))
  }

  function changeTasksFilter(value: FilterValueType, todolistId: string) {
    dispatchToTodolistsReducer(changeTodolistFilterAC(value, todolistId))
  }

  function removeTodolist(todolistId: string) {
    const action = removeTodolistAC(todolistId);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action)
  }


  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action)
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
               if (tl.filter === "completed") {
                 tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
               }
               if (tl.filter === "active") {
                 tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
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
                     /!* addTask={addTask}*!/
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

*/

