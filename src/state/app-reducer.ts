import {AppThunk} from "../app/store";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "./login-reducer";

const InitialState: AppStateType  = {
  status: 'idle',
  error: null,
  initialized: false
}

export const appReducer = (state: AppStateType = InitialState, action: AppActionType): AppStateType => {
  switch (action.type) {
    case 'SET-STATUS':
      return {...state, status: action.status}
    case 'SET-ERROR':
      return {...state, error: action.error}
    case "SET-IS-INITIALIZED":
      return {...state, initialized: action.value}
    default:
      return state
  }
}

//actions
export const setAppErrorAC = (error: string|null)=>({type: 'SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType)=>({type: 'SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean)=>({type: 'SET-IS-INITIALIZED', value} as const)

//thunks
export const initializeAppTC = (): AppThunk => (dispatch)=>{
authAPI.me().then(res=>{
  if(res.data.resultCode === 0) {
    dispatch(setIsLoggedInAC(true))
  } else {

  }
  dispatch(setAppInitializedAC(true))
})
}
//types
export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'
export type AppStateType = {
  status: RequestStatusType
  error:  string | null
  //для инициализации приложения
  initialized: boolean
}
export type AppActionType = ReturnType<typeof setAppErrorAC>
| ReturnType<typeof setAppStatusAC>
| ReturnType<typeof setAppInitializedAC>