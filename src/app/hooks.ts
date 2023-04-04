import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppRootStateType, AppDispatchType } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatchType
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector