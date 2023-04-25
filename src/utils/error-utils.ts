import {setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch)=>{
  // если length вообще существует, то
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch)=>{
  dispatch(setAppErrorAC(error.message ? error.message : 'some error occurred'))
  dispatch(setAppStatusAC('failed'))
}