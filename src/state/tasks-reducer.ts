import {TaskStateType} from "../App";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {AppRootStateType, AppThunk} from "./store";


export type TasksActionsType = ReturnType<typeof removeTaskAC>
   | ReturnType<typeof addTaskAC>
   | ReturnType<typeof changeTaskTitleAC>
   | ReturnType<typeof updateTaskAC>
   | ReturnType<typeof addTodolistAC>
   | ReturnType<typeof removeTodolistAC>
   | ReturnType<typeof setTodolistsAC>
   | ReturnType<typeof setTasksAC>


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
      debugger
      const stateCopy = {...state}
      const newTask = action.task
      const tasks = stateCopy[newTask.todoListId]
      const newTasks = [newTask, ...tasks]
      stateCopy[newTask.todoListId] = newTasks
      return stateCopy
    }
    case 'UPDATE-TASK': {
      let tasks = state[action.todolistID]
      state[action.todolistID] = tasks
         .map(t => t.id === action.taskID
            ? {...t, ...action.model}
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
      stateCopy[action.todolist.id] = []
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
export const setTasksAC = (tasks: Array<TaskType>, todolistID: string) => ({
  type: "SET-TASKS",
  tasks,
  todolistID
} as const)


export const fetchTasksTC = (todolistID: string): AppThunk => {
  return (dispatch) => {
    todolistsAPI.getTasks(todolistID).then((res) => {
      dispatch(setTasksAC([res.data.items], todolistID))
    })
  }
}

export const removeTaskTC = (taskID: string, todolistId: string): AppThunk => {
  return (dispatch) => {
    todolistsAPI.deleteTask(taskID, todolistId).then(res => {
      dispatch(removeTaskAC(taskID, todolistId))
    })
  }
}

export const addTaskTC = (title: string, todolistId: string): AppThunk => {
  return (dispatch) => {
    todolistsAPI.createTask(title, todolistId)
       .then(res => {
         dispatch(addTaskAC(res.data.data.items))
       })
  }
}

export type UpdateDomainTaskModelType = {
  description?: string
  title?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export const updateTaskTC = (taskID: string, domaimModel: UpdateDomainTaskModelType, todolistID: string): AppThunk => {
  return (dispatch, getState: () => AppRootStateType) => {
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
      ...domaimModel
    }
    todolistsAPI.updateTask(todolistID, taskID, apiModel)
       .then(res => {
         dispatch(updateTaskAC(taskID, domaimModel, todolistID))
       })
  }
}