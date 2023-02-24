import axios from "axios";

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

type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
type ResponseType<D={}>={
  resultCode: number
  messages: [],
  data: D
}


export let todolistsAPI = {
  getTodolists() {
    const promise = instance.get<Array<TodolistType>>('todo-lists')
    return promise
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
  },
  getTasks (todolistId: string) {
return instance.get(`todo-lists/${todolistId}/tasks`)
  },
  createTask (todolistId: string, title: string) {
    return instance.post(`todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask (todolistId: string, taskId: string) {
    return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask (todolistId: string, taskId: string, title: string) {
    return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
  }
}