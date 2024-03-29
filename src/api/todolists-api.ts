import axios, {AxiosResponse} from 'axios';


const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "198377a1-b97d-41c4-a5b8-692b6bfcbc08"
  }
}
const instance = axios.create({
  ...settings,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/'
})


//api
export let todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
  },
  getTasks(todolistId: string) {
    return instance.get<TasksContentType>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(taskId: string, todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<TaskType>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  }
}

export let authAPI = {
  login(params: LoginParamsType){
    return instance.post<ResponseType<{ userId?: number }>>('auth/login', params)
  },
  me(){
    return instance.get<ResponseType<{id:number, email: string, login: string }>>('auth/me')
  },
  logOut(){
    return instance.delete<ResponseType<{userId?: number}>>('auth/login')
  }
}


// types
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type ResponseType<D = {}> = {
  resultCode: number
  messages: string,
  data: D
}

export enum TaskStatuses {
  New,
  InProgress,
  Completed,
  Draft
}

export enum TaskPriorities {
  Low,
  Middle,
  Hi,
  Urgently,
  Later
}

export type TaskType = UpdateTaskModelType & {
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type TasksContentType = {
  totalCount: number
  error: string | null
  items: TaskType[]
}
export type UpdateTaskModelType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}
export type LoginParamsType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha?: boolean
}