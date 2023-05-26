import {AppThunk} from "../app/store";
import {setAppStatusAC} from "./app-reducer";
import {authAPI, LoginParamsType} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const InitialState: LoginStateType = {
  isLoggedIn: false
}

export const loginReducer = (state: LoginStateType = InitialState, action: LoginActionType): LoginStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}

//actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunks
export const loginTC = (params: LoginParamsType): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.login(params)
     .then(res => {
       if (res.data.resultCode === 0) {
         dispatch(setIsLoggedInAC(true))
         dispatch(setAppStatusAC('success'))
       } else {
         handleServerAppError(res.data, dispatch)
       }
     })
     .catch((error) => {
       handleServerNetworkError(error, dispatch)
     })
}
export const logOutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.logOut()
     .then(res => {
       if (res.data.resultCode === 0) {
         dispatch(setIsLoggedInAC(false))
         dispatch(setAppStatusAC('success'))
       } else {
         handleServerAppError(res.data, dispatch)
       }
     })
     .catch((error) => {
       handleServerNetworkError(error, dispatch)
     })
}

//types
export type LoginStateType = {
  isLoggedIn: boolean
}
export type LoginActionType = ReturnType<typeof setIsLoggedInAC>