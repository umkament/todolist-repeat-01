import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskStateType} from "../App";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

test('new array should be added when new todolist is added', () => {
  const startState: TaskStateType = {
    'todolistId1': [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: "todolistId1",
        order: 0,
        addedDate: ''
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: "todolistId1",
        order: 0,
        addedDate: ''
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: ''
      }
    ],
    'todolistId2': [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: ''
      },
      {
        id: '2',
        title: 'milk',
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
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: ''
      }
    ]
  }

  const action = addTodolistAC('new todolist')

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('ids should be equals', () => {
  const startTasksState: TaskStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const action = addTodolistAC('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todolistID)
  expect(idFromTodolists).toBe(action.todolistID)
})
