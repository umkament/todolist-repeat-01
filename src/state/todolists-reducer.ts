import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunk} from "./store";

export type TodolistsActionsType =
   RemoveTodolistActionType |
   AddTodolistActionType |
   ChangeTodolistTitleActionType |
   ChangeTodolistFilterActionType |
   SetTodolistActionType

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST",
  id: string
}
export type AddTodolistActionType = {
  type: "ADD-TODOLIST",
  title: string,
  todolistID: string

}
type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE",
  id: string,
  title: string
}
type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER',
  id: string,
  filter: FilterValueType
}
export type SetTodolistActionType = {
  type: 'SET-TODOLISTS',
  todolists: Array<TodolistType>
}

export type FilterValueType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
  filter: FilterValueType
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [{
        id: action.todolistID,
        title: action.title,
        filter: 'all',
        addedDate: '',
        order: 0
      }, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.id)
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
    case "SET-TODOLISTS": {
      return action.todolists.map(tl =>{
        return {
          ...tl,
          filter: 'all'
        }
      })
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

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistActionType => {
  return {
    type: 'SET-TODOLISTS',
    todolists: todolists
  }
}

export const fetchTodolistsTC = (): AppThunk=> {
  return (dispatch) => {
    todolistsAPI.getTodolists().then(res => {
      dispatch(setTodolistsAC(res.data))
    })
  }
}