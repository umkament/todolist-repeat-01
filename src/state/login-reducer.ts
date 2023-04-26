import {AppThunk} from "../app/store";
import {setAppStatusAC} from "./app-reducer";
import {authAPI, LoginParamsType} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const InitialState: LoginStateType  = {

}

export const loginReducer = (state: LoginStateType = InitialState, action: LoginActionType): LoginStateType => {
  switch (action.type) {


    default:
      return state
  }
}

//actions
export const setAppErrorAC = (error: string|null)=>({type: 'SET-ERROR', error} as const)

//thunks
export const loginTC = (params: LoginParamsType): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.login(params)
     .then(res => {
       if (res.data.resultCode === 0) {
        alert('llllll')
         dispatch(setAppStatusAC('success'))
       } else {
         handleServerAppError(res.data, dispatch)
       }
     })
     .catch((error)=>{
       handleServerNetworkError(error, dispatch)
     })
}

//types
export type LoginStateType = {

}
export type LoginActionType = any