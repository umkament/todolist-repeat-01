import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppThunk} from "../app/store";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id)
    case 'ADD-TODOLIST':
      return [{...action.todolist, filter: 'all'}, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      //возвращаем state который мапим, соответственно возвращаем новый массив
      //в map приходит tl и мы пробегаемся по всем тудулистам
      //и если id тудулиста равна id, которая приходит в action, то
      //возвращаем копию тудулиста, которому меняем title на тот, что пришел в action
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    case "SET-TODOLISTS":
      return action.todolists.map(tl => ({...tl, filter: 'all'}))
    default:
      return state;
  }
}

//actions
export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const changeTodolistTitleAC = (todolistID: string, newTitle: string) => ({
  type: "CHANGE-TODOLIST-TITLE",
  id: todolistID,
  title: newTitle
} as const)
export const changeTodolistFilterAC = (todolistID: string, newFilter: FilterValueType) => ({
  type: 'CHANGE-TODOLIST-FILTER',
  id: todolistID,
  filter: newFilter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

//thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  todolistsAPI.getTodolists().then(res => {
    dispatch(setTodolistsAC(res.data))
  })
}
// пример async/await
//сначала объявляем, что наша функция асинхронная async
//await - говорит: "жди ответ с сервера"
//когда получим ответ с сервера, запишем его в переменную res
//и тогда функция продолжит выполняться дальше
//строки внутри функции будут выполняттся последовательно
/*export const fetchTodolistsTC = (): AppThunk => async dispatch => {
  try {
    const res = await todolistsAPI.getTodolists()
    dispatch(setTodolistsAC(res.data))
  } catch(e) {
    console.error(e)
  }
}*/

export const removeTodolistsTC = (todolistID: string): AppThunk => (dispatch) => {
  todolistsAPI.deleteTodolist(todolistID).then(res => {
    dispatch(removeTodolistAC(todolistID))
  })
}
export const addTodolistsTC = (title: string): AppThunk => (dispatch) => {
  todolistsAPI.createTodolist(title).then(res => {
    dispatch(addTodolistAC(res.data.data.item))
  })
}
export const changeTodolistTitleTC = (todolistID: string, title: string): AppThunk => (dispatch) => {
  todolistsAPI.updateTodolist(todolistID, title).then(res => {
    dispatch(changeTodolistTitleAC(todolistID, title))
  })
}

//types
export type TodolistsActionsType = ReturnType<typeof removeTodolistAC>
   | ReturnType<typeof addTodolistAC>
   | ReturnType<typeof changeTodolistTitleAC>
   | ReturnType<typeof changeTodolistFilterAC>
   | ReturnType<typeof setTodolistsAC>

export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType
}