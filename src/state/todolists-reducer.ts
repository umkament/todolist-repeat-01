import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppThunk} from "./store";

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

//actions
export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const changeTodolistTitleAC = (todolistID: string, newTitle: string) => ({type: "CHANGE-TODOLIST-TITLE",id: todolistID,title: newTitle} as const)
export const changeTodolistFilterAC = (todolistID: string, newFilter: FilterValueType) => ({type: 'CHANGE-TODOLIST-FILTER', id: todolistID,filter: newFilter} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS',todolists} as const)

//thunks
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

//types
export type TodolistsActionsType = ReturnType<typeof removeTodolistAC>
   |ReturnType<typeof addTodolistAC>
   |ReturnType<typeof changeTodolistTitleAC>
   |ReturnType<typeof changeTodolistFilterAC>
   |ReturnType<typeof setTodolistsAC>

export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType
}