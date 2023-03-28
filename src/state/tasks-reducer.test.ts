import {TaskStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

test('correct task should be removed from correct array', () => {
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

     const action = removeTaskAC("2", "todolistID2")
     const endState = tasksReducer(startState, action)

     expect(endState['todolistID1'].length).toBe(3)
     expect(endState['todolistID2'].length).toBe(2)
     expect(endState['todolistID2'].every(t => t.id != "2")).toBeTruthy()
   }
)

test('new task should be added in correct array', () => {
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


     const action = addTaskAC("juse", "todolistID2")
     const endState = tasksReducer(startState, action)

     expect(endState['todolistID1'].length).toBe(3)
     expect(endState['todolistID2'].length).toBe(4)
     expect(endState['todolistID2'][0].id).toBeDefined()
     expect(endState['todolistID2'][0].title).toBe("juse")
     expect(endState['todolistID2'][0].status).toBe(TaskStatuses.New)
   }
)

test('status of specified task should be changed', () => {
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

  const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)

})

test('title of specified task should be changed', () => {
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

  const action = changeTaskTitleAC('2', "coca-cola", 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].title).toBe('coca-cola')
  expect(endState['todolistId1'][1].title).toBe('JS')
})

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

test('property with todolistId should be deleted', () => {
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

  const action = removeTodolistAC('todolistId2')

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})
