
export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'
export type AppStateType = {
  status: RequestStatusType
  error: string | null
}

const InitialState: AppStateType  = {
  status: 'idle',
  error: 'some error'
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


export const setErrorAC = (error: string|null)=>({type: 'SET-ERROR', error} as const)
export const setStatusAC = (status: RequestStatusType)=>({type: 'SET-STATUS', status} as const)

export type AppActionType = ReturnType<typeof setErrorAC>
| ReturnType<typeof setStatusAC>