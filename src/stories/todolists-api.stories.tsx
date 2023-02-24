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

