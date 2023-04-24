import {appReducer, AppStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: AppStateType

beforeEach(()=>{
  startState = {
    error: null,
    status: "idle"
  }
})

test('error should be set', ()=>{
  const endState = appReducer(startState, setAppErrorAC('some error'))

  expect(endState.error).toBe('some error')
})

test('status should be set', ()=>{
  const endState = appReducer(startState, setAppStatusAC('idle'))

  expect(endState.status).toBe('idle')
})