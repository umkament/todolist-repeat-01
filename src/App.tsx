import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";
import {TodolistDomainType} from "./state/todolists-reducer";

export type FilterValueType = "all" | "active" | "completed"

export type TodolistType = {
  id: string,
  title: string
  filter: FilterValueType
}
export type TaskStateType = {
  [key: string]: Array<TaskType>
}

export function App() {
  console.log('App rendered')

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
    {id: todolistID1, title: "what to watch", filter: "all", addedDate: '', order: 0},
    {id: todolistID2, title: "list for to do", filter: "completed", addedDate: '', order: 0}
  ])

  let [tasksObj, setTasks] = useState<TaskStateType>({
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
    let tasks = tasksObj[todolistId];
    tasksObj[todolistId] = tasks.filter(t => t.id !== id)
    setTasks({...tasksObj})
  }

  function addTask(title: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let newTask = {
      id: v1(),
      title: title,
      status: TaskStatuses.New,
      description: "",
      priority: TaskPriorities.Low,
      startDate: '',
      deadline: '',
      todoListId: todolistID1,
      order: 0,
      addedDate: ''
    }
    tasksObj[todolistId] = [...tasks, newTask]
    setTasks({...tasksObj})
  }

  function changeTaskStatus(taskID: string, status: TaskStatuses, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskID)
    if (task) {
      task.status = status;
      setTasks({...tasksObj})
    }
  }

  function changeTaskTitle(taskID: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskID)
    if (task) {
      task.title = newTitle;
      setTasks({...tasksObj})
    }
  }

  function changeTodolistTitle(todolostId: string, newTitle: string) {
    let todolist = todolists.find(tl => tl.id === todolostId)
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists])
    }
  }

  function changeTasksFilter(todolistId: string, value: FilterValueType) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }


  function removeTodolist(todolistId: string) {
    let removedTodolist = todolists.filter((tl) => tl.id !== todolistId)
    setTodolists(removedTodolist)

    delete tasksObj[todolistId]
    setTasks({...tasksObj})
  }


  function addTodolist(title: string) {
    debugger
    let todolist: TodolistDomainType = {
      id: v1(),
      filter: "all",
      title: title,
      addedDate: '',
      order: 0
    }
    setTodolists([todolist, ...todolists])
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })
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


