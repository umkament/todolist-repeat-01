
type AppStateType = {
  status: 'idle' | 'loading' | 'success' | 'failed'
  error: 'string' | null
}

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


export type AppActionType = any