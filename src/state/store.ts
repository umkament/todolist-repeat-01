import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TodolistsActionsType, todolistsReducer} from "./todolists-reducer";
import {TasksActionsType, tasksReducer} from "./tasks-reducer";
import thunkMiddleware from 'redux-thunk'


const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppActionsType = TasksActionsType | TodolistsActionsType

// @ts-ignore
window.store = store