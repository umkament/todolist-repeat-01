import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {useState} from "react";
import {AddItemForm} from "./AddItemForm";

export type TasksType = {
  id: string,
  title: string,
  isDone: boolean
}
export type FilterValueType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}
export type TasksStateType = {
  [key: string]: Array<TasksType>
}

export function App() {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistID1, title: "your first time", filter: 'all'},
    {id: todolistID2, title: "list of messages", filter: 'all'}
  ])

  let [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todolistID1]: [
      {id: v1(), title: "nnnnnn", isDone: false},
      {id: v1(), title: "hhhhhh", isDone: false},
      {id: v1(), title: "lllll", isDone: true},
      {id: v1(), title: "kkkkkkn", isDone: true}
    ],
    [todolistID2]: [
      {id: v1(), title: "1", isDone: false},
      {id: v1(), title: "22", isDone: false},
      {id: v1(), title: "333", isDone: true},
      {id: v1(), title: "4444", isDone: true}
    ]

  })

  function addTodolist (title: string) {
    let todolist: TodolistType = {id: v1(), title, filter: 'all'}
    setTodolists([todolist, ...todolists])
    setTasksObj({
       ...tasksObj,
       [todolist.id]:[]
    })
  }

  function removeTodolist (todolistId: string) {
    let filtredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filtredTodolist)

    delete tasksObj[todolistId]
    setTasksObj({...tasksObj})
  }

  function changeTodolistTitle (todolistId: string, newTitle: string) {
    let todolist = todolists.find(tl=> tl.id === todolistId)
    if (todolist) {
      todolist.title = newTitle
      setTodolists([...todolists])
    }
  }

  function removeTask (id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    tasksObj[todolistId] = tasks.filter(t=>t.id !== id)
    setTasksObj({...tasksObj})
  }

  function addTaskTitle(title: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = {id: v1(), title, isDone: false}
    tasksObj[todolistId]=[task,...tasks]
    setTasksObj({...tasksObj})
  }

  function changeTaskStatus(newIsDone: boolean, id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === id)
    if (task) {
      task.isDone = newIsDone
      setTasksObj({...tasksObj})
    }
  }

  function changeTaskTitle(newTitle: string, id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === id)
    if (task) {
      task.title = newTitle
      setTasksObj({...tasksObj})
    }
  }

  function changeTasksFilter(value: FilterValueType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }



  return (
     <div>
       <AddItemForm addItem={addTodolist}/>
  {
    todolists.map(tl => {

      let filtredTasks = tasksObj[tl.id]
      if (tl.filter === "active") {
        filtredTasks = tasksObj[tl.id].filter(t => !t.isDone)
      }
      if (tl.filter === "completed") {
        filtredTasks = tasksObj[tl.id].filter(t => t.isDone)
      }

      return (
         <Todolist
         key={tl.id}
         id={tl.id}
         title={tl.title}
         tasks={filtredTasks}
         removeTask={removeTask}
         changeTasksFilter={changeTasksFilter}
         addTaskTitle={addTaskTitle}
         changeTaskStatus={changeTaskStatus}
         filter={tl.filter}
         removeTodolist={removeTodolist}
         changeTaskTitle={changeTaskTitle}
         changeTodolistTitle={changeTodolistTitle}
      />
      )
    })}
     </div>
    )

  }

