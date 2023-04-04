import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TodolistsActionsType, todolistsReducer} from "../state/todolists-reducer";
import {TasksActionsType, tasksReducer} from "../state/tasks-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = TasksActionsType | TodolistsActionsType

export type AppDispatchType = ThunkDispatch<AppRootStateType,unknown, AppActionsType>



export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType,unknown, AppActionsType>

// @ts-ignore
window.store = store