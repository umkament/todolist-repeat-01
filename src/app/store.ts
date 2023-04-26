import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TodolistsActionsType, todolistsReducer} from "../state/todolists-reducer";
import {TasksActionsType, tasksReducer} from "../state/tasks-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionType, appReducer} from "../state/app-reducer";
import {LoginActionType, loginReducer} from "../state/login-reducer";


const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  login: loginReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootStateType = ReturnType<typeof rootReducer>

export type ActionsType = TasksActionsType | TodolistsActionsType | AppActionType | LoginActionType

export type AppDispatchType = ThunkDispatch<RootStateType,unknown, ActionsType>



export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType,unknown, ActionsType>

// @ts-ignore
window.store = store