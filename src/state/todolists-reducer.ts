import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunk} from "./store";

export type TodolistsActionsType = ReturnType<typeof removeTodolistAC>
  |ReturnType<typeof addTodolistAC>
  |ReturnType<typeof changeTodolistTitleAC>
  |ReturnType<typeof changeTodolistFilterAC>
  |ReturnType<typeof setTodolistsAC>


/*
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
*/

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
   /* case 'ADD-TODOLIST': {
      return [{
        id: action.todolistID,
        title: action.title,
        filter: 'all',
        addedDate: '',
        order: 0
      }, ...state]
    }*/
    case 'ADD-TODOLIST': {
      let newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
      return [newTodolist, ...state]
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

export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const changeTodolistTitleAC = (todolistID: string, newTitle: string) => ({type: "CHANGE-TODOLIST-TITLE",id: todolistID,title: newTitle} as const)
export const changeTodolistFilterAC = (todolistID: string, newFilter: FilterValueType) => ({type: 'CHANGE-TODOLIST-FILTER', id: todolistID,filter: newFilter} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS',todolists} as const)


export const fetchTodolistsTC = (): AppThunk=> {
  return (dispatch) => {
    todolistsAPI.getTodolists().then(res => {
      dispatch(setTodolistsAC(res.data))
    })
  }
}

export const removeTodolistsTC = (todolistID: string): AppThunk=> {
  return (dispatch) => {
    todolistsAPI.deleteTodolist(todolistID).then(res => {
      dispatch(removeTodolistAC(todolistID))
    })
  }
}

export const addTodolistsTC = (title: string): AppThunk=> {
  return (dispatch) => {
    todolistsAPI.createTodolist(title).then(res => {
      dispatch(addTodolistAC(res.data.data.item))
    })
  }
}

export const changeTodolistTitleTC = (todolistID: string, title: string): AppThunk=> {
  return (dispatch) => {
    todolistsAPI.updateTodolist(todolistID, title).then(res => {
      dispatch(changeTodolistTitleAC(todolistID, title))
    })
  }
}


