import {appReducer, AppStateType, setErrorAC, setStatusAC} from "./app-reducer";

let startState: AppStateType

beforeEach(()=>{
  startState = {
    error: null,
    status: "idle"
  }
})

test('error should be set', ()=>{
  const endState = appReducer(startState, setErrorAC('some error'))

  expect(endState.error).toBe('some error')
})

test('status should be set', ()=>{
  const endState = appReducer(startState, setStatusAC('idle'))

  expect(endState.status).toBe('idle')
})