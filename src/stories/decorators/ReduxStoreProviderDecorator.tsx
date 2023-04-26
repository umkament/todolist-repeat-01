import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {RootStateType} from '../../app/store'
import {tasksReducer} from '../../state/tasks-reducer'
import {todolistsReducer} from '../../state/todolists-reducer'
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {appReducer} from "../../state/app-reducer";
import thunkMiddleware from "redux-thunk";


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer
})

const initialGlobalState: RootStateType = {
  todolists: [
    {id: 'todolistId1', title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
    {id: 'todolistId2', title: 'What to buy', filter: 'all', entityStatus: 'loading', addedDate: '', order: 0}
  ],
  tasks: {
    ['todolistId1']: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: ''
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: ''
      }
    ],
    ['todolistId2']: [
      {
        id: v1(),
        title: 'Milk',
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: ''
      },
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: ''
      }
    ]
  },
  app: {
    status: 'idle',
    error: null
  },
  login: {
    isLoggedIn: false
  }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware))

export const ReduxStoreProviderDecorator = (storyFn: any) => (
   <Provider
      store={storyBookStore}>{storyFn()}
   </Provider>)
