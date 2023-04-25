import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {AppThunk, RootStateType} from "../app/store";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: TasksActionsType): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      // возвращаем копию state, в которой хотим перезаписать свойство [action.todolistID]
      // на то, что было в state изначально state[action.todolistID]
      // только с приминением к этому массиву фильтрации
      return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
    case 'ADD-TASK':
      // возвращаем копию state и в нужный тудулист [action.task.todoListId]
      // подменяем массив на тот, что и был, но в начало добавляем новую таску
      console.log(action.task)
      console.log(action)
      return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
    case 'UPDATE-TASK':
      //возвращаем копию state, и в нужном тудулисте [action.task.todoListId]
      // вернем тот же массив, что и был, но пробежимся по этому массиву мапом
      //
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {...t, ...action.model} : t)
      }
    case 'ADD-TODOLIST':
      return {...state, [action.todolist.id]: []}
    case "REMOVE-TODOLIST":
      const stateCopy = {...state}
      delete stateCopy[action.id]
      return stateCopy
    case "SET-TODOLISTS": {
      const stateCopy = {...state}
      action.todolists.forEach(tl => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case "SET-TASKS":
      return {...state, [action.todolistID]: action.tasks}
    default:
      return state
  }
}

// actions
export const removeTaskAC = (taskID: string, todolistID: string) => ({
  type: "REMOVE-TASK",
  taskID: taskID,
  todolistID: todolistID
} as const)
export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task} as const)
export const updateTaskAC = (taskID: string, model: UpdateDomainTaskModelType, todolistID: string) => ({
  type: 'UPDATE-TASK',
  taskID,
  model,
  todolistID
} as const)
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string,) => ({
  type: 'CHANGE-TASK-TITLE',
  taskID,
  title,
  todolistID
} as const)
export const setTasksAC = (tasks: TaskType[], todolistID: string) => ({
  type: "SET-TASKS",
  tasks,
  todolistID
} as const)

//thunks
export const fetchTasksTC = (todolistID: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI.getTasks(todolistID)
     .then((res) => {
    dispatch(setTasksAC(res.data.items, todolistID))
    dispatch(setAppStatusAC('success'))
  })
     .catch((error)=>{
       handleServerNetworkError(error, dispatch)
     })
}
export const removeTaskTC = (taskID: string, todolistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI.deleteTask(taskID, todolistId)
     .then(res => {
    dispatch(removeTaskAC(taskID, todolistId))
       dispatch(setAppStatusAC('success'))
  })
     .catch((error)=>{
       handleServerNetworkError(error, dispatch)
     })
}
export const addTaskTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI.createTask(todolistId, title)
     .then(res => {
       if (res.data.resultCode === 0) {
         dispatch(addTaskAC(res.data.data.item))
         dispatch(setAppStatusAC('success'))
       } else {
         handleServerAppError(res.data, dispatch)
       }
     })
     .catch((error)=>{
       handleServerNetworkError(error, dispatch)
     })
}
export const updateTaskTC = (taskID: string, domainModel: UpdateDomainTaskModelType, todolistID: string): AppThunk => {
  return (dispatch, getState: () => RootStateType) => {
    const state = getState()
    const task = state.tasks[todolistID].find(t => t.id === taskID)
    if (!task) {
      console.warn('task not founded')
      return;
    }
    const apiModel: UpdateTaskModelType = {
      description: task.description,
      title: task.title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...domainModel
    }
    todolistsAPI.updateTask(todolistID, taskID, apiModel)
       .then(res => {
         if (res.data.resultCode === 0) {
         dispatch(updateTaskAC(taskID, domainModel, todolistID))
       } else {
           handleServerAppError(res.data, dispatch)
         }
       })
       .catch((error)=>{
         handleServerNetworkError(error, dispatch)
       })
  }
}

// types
export type TaskStateType = {
  [key: string]: Array<TaskType>
}
export type UpdateDomainTaskModelType = {
  description?: string
  title?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export type TasksActionsType = ReturnType<typeof removeTaskAC>
   | ReturnType<typeof addTaskAC>
   | ReturnType<typeof changeTaskTitleAC>
   | ReturnType<typeof updateTaskAC>
   | ReturnType<typeof addTodolistAC>
   | ReturnType<typeof removeTodolistAC>
   | ReturnType<typeof setTodolistsAC>
   | ReturnType<typeof setTasksAC>
   | ReturnType<typeof setAppErrorAC>
