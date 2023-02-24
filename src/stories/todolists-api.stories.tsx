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

export const GetTasks = ()=> {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const id= 'ec4ec56f-8168-4ae6-928a-047e7870d610'
    todolistsAPI.getTasks(id).then(response => {
      setState(response.data)
    })
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке

  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = ()=> {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const id= 'ec4ec56f-8168-4ae6-928a-047e7870d610'
    const taskTitle = 'newTask'
    todolistsAPI.createTask(id, taskTitle).then(response => {
      setState(response.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTasks = ()=> {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId= 'ec4ec56f-8168-4ae6-928a-047e7870d610'
    const taskId= ''
    todolistsAPI.deleteTask(todolistId, taskId).then(response => {
      setState(response.data)
    })
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке

  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTasks = ()=> {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId= 'ec4ec56f-8168-4ae6-928a-047e7870d610'
    const taskId= 'a2873742-b5da-473d-b35d-38532cae115d'
    const taskTitle = 'changeTaskTitle'
    todolistsAPI.updateTask(todolistId, taskId, taskTitle).then(response => {
      setState(response.data)
    })
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке

  }, [])
  return <div>{JSON.stringify(state)}</div>
}

