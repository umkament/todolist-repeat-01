import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "198377a1-b97d-41c4-a5b8-692b6bfcbc08"
  }
}
type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
type ResponseType<D>={
  resultCode: number
  messages: [],
  data: D
}


export let todolistsAPI = {
  getTodolists() {
    return axios.get<Array<TodolistType>>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
  },
  createTodolist(title: string) {
    return axios.post<ResponseType<{item: TodolistType}>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
  },
  deleteTodolist(todolistId: string) {
    return axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
  },
  updateTodolist(todolistId: string, title: string) {
    return axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
  }
}