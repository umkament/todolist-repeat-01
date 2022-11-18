import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionsType =
   RemoveTodolistActionType|
   AddTodolistActionType|
   ChangeTodolistTitleActionType |
   ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  todolistID: string
}
type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}
type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValueType
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

export let todolistID1 = v1();
export let todolistID2 = v1();

const initialState: Array<TodolistType> = [
  {id: todolistID1, title: "what to watch", filter: "all"},
  {id: todolistID2, title: "list for to do", filter: "completed"}
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [{
        id: action.todolistID,
        title: action.title,
        filter: 'all'
      }, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      let todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      let todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state]
    }
    default:
      return state;
  }
}

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
  return {
    type: "REMOVE-TODOLIST",
    id: todolistID
  }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {
    type: "ADD-TODOLIST",
    title: title,
    todolistID: v1()
  }
}

export const changeTodolistTitleAC = (todolistID: string, newTitle: string): ChangeTodolistTitleActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id: todolistID,
    title: newTitle
  }
}

export const changeTodolistFilterAC = (newFilter: FilterValueType, todolistID: string): ChangeTodolistFilterActionType => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    id: todolistID,
    filter: newFilter
  }
}