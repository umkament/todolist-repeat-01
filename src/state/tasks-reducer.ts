import {TaskStateType} from "../App";
import {v1} from "uuid";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistActionType,
  setTodolistsAC
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";
import {AppActionsType} from "./store";
import {Dispatch} from "redux";


export type TasksActionsType = RemoveTaskActionType |
   AddTaskActionType |
   ChangeTaskStatusActionType |
   ChangeTaskTitleActionType |
   AddTodolistActionType |
   RemoveTodolistActionType |
   SetTodolistActionType |
   SetTasksActionType

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
  status: TaskStatuses
}
type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  todolistID: string
  taskID: string
  title: string
}
export type SetTasksActionType = {
  type: 'SET-TASKS'
  tasks: Array<TaskType>
  todolistID: string
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: TasksActionsType): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = {...state}
      const tasks = state[action.todolistID]
      stateCopy[action.todolistID] = tasks.filter(t => t.id !== action.taskID)
      return stateCopy;
    }
    case 'ADD-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.todolistID]
      const newTask = {
        id: v1(),
        title: action.title,
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: action.todolistID,
        order: 0,
        addedDate: ''
      }
      stateCopy[action.todolistID] = [newTask, ...tasks]
      return stateCopy
    }
    case 'CHANGE-TASK-STATUS': {
      let tasks = state[action.todolistID]
      state[action.todolistID] = tasks
         .map(t => t.id === action.taskID
            ? {...t, status: action.status}
            : t)
      return ({...state})
    }
    case 'CHANGE-TASK-TITLE': {
      const stateCopy = {...state}
      let tasks = stateCopy[action.todolistID]
      stateCopy[action.todolistID] = tasks
         .map(t => t.id === action.taskID
            ? {...t, title: action.title}
            : t)
      return stateCopy
    }
    case 'ADD-TODOLIST': {
      const stateCopy = {...state}
      stateCopy[action.todolistID] = []
      return stateCopy
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = {...state}
      delete stateCopy[action.id]
      return stateCopy
    }
    case "SET-TODOLISTS": {
      const stateCopy = {...state}
      action.todolists.forEach(tl => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case "SET-TASKS": {
      const stateCopy = {...state}
      stateCopy[action.todolistID] = action.tasks
      return stateCopy
    }
    default:
      return state
  }
}


export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
  return {type: "REMOVE-TASK", taskID: taskID, todolistID: todolistID}
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
  return {type: "ADD-TASK", title, todolistID}
}
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todolistID: string,): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', taskID, status, todolistID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string,): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistID}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistID: string): SetTasksActionType => {
  return { type: "SET-TASKS", tasks, todolistID}
}

export const fetchTasksTC = (todolistID: string)=> {
  return (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.getTasks(todolistID).then((res) => {
      dispatch(setTasksAC(res.data.items, todolistID))
    })
  }
}