import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistID1, todolistID2} from "./todolists-reducer";


export type ActionsType = RemoveTaskActionType |
                          AddTaskActionType |
                          ChangeTaskStatusActionType |
                          ChangeTaskTitleActionType |
                          AddTodolistActionType |
                          RemoveTodolistActionType

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  todolistID: string
  taskID: string
}
type AddTaskActionType = {
  type: 'ADD-TASK'
  todolistID: string
  title: string
}
type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  todolistID: string
  taskID: string
  isDone: boolean
}
type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  todolistID: string
  taskID: string
  title: string
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

const initialState: TaskStateType = {
  [todolistID1]: [
    {id: v1(), isDone: true, title: "interstellar"},
    {id: v1(), isDone: false, title: "terminator"},
    {id: v1(), isDone: true, title: "true detective"},
    {id: v1(), isDone: false, title: "avatar"}
  ],
  [todolistID2]: [
    {id: v1(), isDone: true, title: "вымыть руки"},
    {id: v1(), isDone: false, title: "кушать"},
    {id: v1(), isDone: true, title: "чистить зубы"},
    {id: v1(), isDone: false, title: "спать"}
  ]
}

  export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
      case "REMOVE-TASK": {
        const stateCopy = {...state}
        const tasks = state[action.todolistID]
        const filteredTasks = tasks.filter(t=> t.id !== action.taskID)
        stateCopy[action.todolistID] = filteredTasks
        return stateCopy;
      }
      case 'ADD-TASK': {
        const stateCopy = {...state}
        const tasks = stateCopy[action.todolistID]
        const newTask = {id: v1(), title: action.title, isDone: false}
        const  newArrayOfTasks = [newTask, ...tasks]
        stateCopy[action.todolistID] = newArrayOfTasks
        return stateCopy
      }
      case 'CHANGE-TASK-STATUS': {
        const stateCopy = {...state}
        let tasks = stateCopy[action.todolistID]
        let task = tasks.find(t=>t.id === action.taskID)
        if(task) {
          task.isDone = action.isDone
        }
          return stateCopy
      }
      case 'CHANGE-TASK-TITLE': {
          const stateCopy = {...state}
          let tasks = stateCopy[action.todolistID]
          let task = tasks.find(t=>t.id === action.taskID)
          if(task) {
            task.title = action.title
          }
            return stateCopy
          }
      case 'ADD-TODOLIST': {
        const stateCopy={...state}

        stateCopy[action.todolistID]=[]

        return stateCopy
      }
      case "REMOVE-TODOLIST": {
        const stateCopy = {...state}
        delete stateCopy[action.id]
        return stateCopy
      }

      default:
    return state;
  }
}




export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
  return {type: "REMOVE-TASK", taskID: taskID, todolistID: todolistID}
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
  return { type: "ADD-TASK",title, todolistID}
}
export const changeTaskStatusAC = (taskID: string,isDone: boolean, todolistID: string,): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistID}
}
export const changeTaskTitleAC = (taskID: string,title: string, todolistID: string,): ChangeTaskTitleActionType => {
  return { type: 'CHANGE-TASK-TITLE', taskID, title, todolistID}
}