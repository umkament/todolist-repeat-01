import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
  title: 'API'
}


export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsAPI.getTodolists().then(response => {
      setState(response.data)
    })
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке

  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsAPI.createTodolist("CHRISLIST").then(response => {
      setState(response.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const id = 'ca57ae97-76e6-4b1c-b966-21b1f577caf9'
    todolistsAPI.deleteTodolist(id).then(response => {
      setState(response.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const id = 'ca57ae97-76e6-4b1c-b966-21b1f577caf9'
    todolistsAPI.updateTodolist(id, "NEWTITLE").then(response => {
      setState(response.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')

  const getTask = () => {

    todolistsAPI.getTasks(todolistId).then(response => {
      setState(response.data)
    })
  }
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={"todolistId"} value={todolistId}
             onChange={(e) => {
               setTodolistId(e.currentTarget.value)
             }}/>
      <button onClick={getTask}>getTask</button>
    </div>
  </div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')

  const createTask = () => {
    todolistsAPI.createTask(todolistId, taskTitle)
       .then(response => {
         setState(response.data)
       })
  }

  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={"todolistId"} value={todolistId}
             onChange={(e) => {
               setTodolistId(e.currentTarget.value)
             }}/>
      <input placeholder={"taskTitle"} value={taskTitle}
             onChange={(e) => {
               setTaskTitle(e.currentTarget.value)
             }}/>
      <button onClick={createTask}>createTask</button>
    </div>
  </div>
}

export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null)
  const [taskId, setTaskId] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')

  const deleteTask = () => {
    todolistsAPI.deleteTask(todolistId, taskId).then(response => {
      setState(response.data)
    })
  }

  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={"todolistId"} value={todolistId}
             onChange={(e) => {
               setTodolistId(e.currentTarget.value)
             }}/>
      <input placeholder={"taskId"} value={taskId}
             onChange={(e) => {
               setTaskId(e.currentTarget.value)
             }}/>
      <button onClick={deleteTask}>deleteTask</button>
    </div>
  </div>
}

export const UpdateTasks = () => {
  const [state, setState] = useState<any>(null)
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')

  const updateTask = () => {
    todolistsAPI.updateTask(todolistId, taskId, taskTitle).then(response => {
      setState(response.data)
    })
  }


  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={"todolistId"} value={todolistId}
             onChange={(e) => {
               setTodolistId(e.currentTarget.value)
             }}/>
      <input placeholder={"taskId"} value={taskId}
             onChange={(e) => {
               setTaskId(e.currentTarget.value)
             }}/>
      <input placeholder={"taskTitle"} value={taskTitle}
             onChange={(e) => {
               setTaskTitle(e.currentTarget.value)
             }}/>
      <button onClick={updateTask}>updateTask</button>
    </div>
  </div>
}

