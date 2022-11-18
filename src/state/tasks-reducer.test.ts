import {TaskStateType} from "../App";
import {tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

test('correct task should be removed from correct array', ()=>{
  const startState: TaskStateType = {
    "todolistID1":[
       {id: "1", title: "CSS", isDone: false},
       {id: "2", title: "HTML", isDone: false},
       {id: "3", title: "JS", isDone: false}
       ],
       "todolistID2":[
       {id: "1", title: "milk", isDone: false},
       {id: "2", title: "bread", isDone: false},
       {id: "3", title: "honey", isDone: false}
     ]
  }
  const action = removeTaskAC("2","todolistID2")
  const endState = tasksReducer(startState,action)

  expect(endState['todolistID1'].length).toBe(3)
  expect(endState['todolistID2'].length).toBe(2)
  expect(endState['todolistID2'].every(t=> t.id != "2")).toBeTruthy()
}
)

test('new task should be added in correct array', ()=>{
     const startState: TaskStateType = {
       "todolistID1":[
         {id: "1", title: "CSS", isDone: false},
         {id: "2", title: "HTML", isDone: false},
         {id: "3", title: "JS", isDone: false}
       ],
       "todolistID2":[
         {id: "1", title: "milk", isDone: false},
         {id: "2", title: "bread", isDone: false},
         {id: "3", title: "honey", isDone: false}
       ]
     }


     const action = addTaskAC("juse", "todolistID2")
     const endState = tasksReducer(startState,action)

     expect(endState['todolistID1'].length).toBe(3)
     expect(endState['todolistID2'].length).toBe(4)
     expect(endState['todolistID2'][0].id).toBeDefined()
     expect(endState['todolistID2'][0].title).toBe("juse")
     expect(endState['todolistID2'][0].isDone).toBe(false)
   }
)

test('status of specified task should be changed', () => {
  const startState: TaskStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = changeTaskStatusAC('2', false, 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].isDone).toBe(false)
  expect(endState['todolistId1'][1].isDone).toBe(true)

})

test('title of specified task should be changed', () => {
  const startState: TaskStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
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
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
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
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = removeTodolistAC('todolistId2')

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})
