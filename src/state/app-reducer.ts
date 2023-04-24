
const InitialState: AppStateType  = {
  status: 'idle',
  error: null
}

export const appReducer = (state: AppStateType = InitialState, action: AppActionType): AppStateType => {
  switch (action.type) {
    case 'SET-STATUS':
      return {...state, status: action.status}
    case 'SET-ERROR':
      return {...state, error: action.error}
    default:
      return state
  }
}

//actions
export const setAppErrorAC = (error: string|null)=>({type: 'SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType)=>({type: 'SET-STATUS', status} as const)

//types

export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'
export type AppStateType = {
  status: RequestStatusType
  error:  string | null
}
export type AppActionType = ReturnType<typeof setAppErrorAC>
| ReturnType<typeof setAppStatusAC>