import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType={
  id: string
  title: string
  isDone: boolean
}
export type TasksStateType={
  [key: string]:Array<TaskType>
}
export type FilterValuesType= "all" | "completed" | "active"

export type TodolistType={
  id: string
  title: string
  filter: FilterValuesType
}

export function App() {
  let todolistID1=v1()
  let todolistID2=v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistID1, title:'repeat todolist', filter: 'all'},
    {id: todolistID2, title:'for example, as a todolist', filter: 'completed'}
  ])


  let [tasksElement, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      {id: v1(), title: 'todolist for student 01', isDone: true},
      {id: v1(), title: 'todolist for student 02', isDone: true},
      {id: v1(), title: 'todolist for student 03', isDone: true},
      {id: v1(), title: 'todolist for student 04', isDone: true},
      {id: v1(), title: 'todolist for student 05', isDone: true}
    ],
    [todolistID2]:[
      {id: v1(), title: 'i want to do', isDone: true},
      {id: v1(), title: 'i can to do', isDone: true},
      {id: v1(), title: 'i should to do', isDone: true},
    ]
  })
  function changeFilterForTasks(value: FilterValuesType, todolistID: string) {
    let todolist = todolists.find(tl=>tl.id === todolistID)
    if (todolist){
      todolist.filter=value
      setTodolists([...todolists])
    }
  }

 function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      title: title,
      filter: "all"
    }
    let newTodolists = [todolist, ...todolists]
    setTodolists(newTodolists)

   setTasks({
     ...tasksElement,
     [todolist.id]:[]
   })
  }
  function removeTodolist(todolistID: string){
    let removedTodolist = todolists.filter(tl=> tl.id !== todolistID)
    setTodolists(removedTodolist)

    delete tasksElement[todolistID]
    setTasks({...tasksElement})
  }
  function changeTodolistTitle(todolistID: string, newTitle: string) {
    let todolist = todolists.find(tl=>tl.id === todolistID)
    if (todolist){
      todolist.title=newTitle
      setTodolists([...todolists])
    }
  }



  function removeTask(id: string, todolistID: string) {
    let tasks = tasksElement[todolistID]
    tasksElement[todolistID] = tasks.filter(t=> t.id !== id)
    setTasks({...tasksElement})
  }
  function addTask(title: string, todolistID: string) {
    let tasks = tasksElement[todolistID]
    let task = {id: v1(), title: title, isDone: false}
    tasksElement[todolistID] = [...tasks, task]
    setTasks({...tasksElement})
  }
  function changeTaskStatus(isDone: boolean, taskId: string, todolistID: string) {
    let tasks = tasksElement[todolistID]
    let task = tasks.find(t=>t.id === taskId)
    if(task){
      task.isDone = isDone
      setTasks({...tasksElement})
    }
  }
  function changeTaskTitle(taskID: string, newTitle: string, todolistID: string) {
    let tasks = tasksElement[todolistID]
    let task = tasks.find(t=>t.id === taskID)
    if(task){
      task.title = newTitle
      setTasks({...tasksElement})
    }
  }




  return (
     <div className="App">
       <AddItemForm addItem={addTodolist}/>
       {todolists.map(tl => {

         let tasksForTodolist = tasksElement[tl.id]
         if (tl.filter === "completed"){
           tasksForTodolist=tasksElement[tl.id].filter(t=>t.isDone)
         }
         if (tl.filter === "active"){
           tasksForTodolist=tasksElement[tl.id].filter(t=>!t.isDone)
         }

         return <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            changeFilterForTasks={changeFilterForTasks}
            addTask={addTask}
            removeTodolist={removeTodolist}
            filter={tl.filter}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}

         />
       })}
  </div>
  )
}

