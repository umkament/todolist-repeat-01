import axios from 'axios';


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

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
type ResponseType<D = {}> = {
  resultCode: number
  messages: [],
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

export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
type TasksContentType = {
  totalCount: number
  error: string | null
  items: TaskType
}

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
    return instance.post<ResponseType<{items: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(taskId: string, todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
  }
}