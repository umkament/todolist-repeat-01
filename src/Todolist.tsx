import {FilterValueType, TasksType} from "./App";
import {ChangeEvent} from "react";
import './App.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpun} from "./EditableSpun";

export type TodolistPropsType = {
  id: string
  title: string
  tasks: Array<TasksType>
  removeTask: (id: string, todolistId: string)=>void
  changeTasksFilter: (value: FilterValueType, todolistId: string)=>void
  addTaskTitle: (title: string, todolistId: string)=>void
  changeTaskStatus: (isDone: boolean, id: string, todolistId: string)=>void
  changeTaskTitle: (newTitle: string, id: string, todolistId: string)=>void
  filter: FilterValueType
  removeTodolist: (todolistId: string)=>void
  changeTodolistTitle: (todolistId: string, newTitle: string)=>void
}

export function Todolist(props: TodolistPropsType) {


  const allClickHandler = () => {props.changeTasksFilter('all', props.id)}
  const activeClickHandler = () => {props.changeTasksFilter('active', props.id)}
  const completedClickHandler = () => {props.changeTasksFilter('completed', props.id)}



  const onClickRemoveTodolistHandler = () => {
    props.removeTodolist(props.id)
  }

  function addTask (title: string) {
    props.addTaskTitle(title, props.id)
  }

  const onChangeTodolistTitleHandler = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }

  return (
     <div>
       <h3>
         <EditableSpun title={props.title} onChange={onChangeTodolistTitleHandler}/>
         <button onClick={onClickRemoveTodolistHandler}>x</button></h3>
       <div>
       <AddItemForm
          addItem={addTask}
       />
       </div>


       <ul>
         {props.tasks.map(t=>{

           const removeTaskHandler = () => {
             props.removeTask(t.id, props.id)
           }
           const onChangeTaskTitleHandler = (newTitle: string) => {
             props.changeTaskTitle(newTitle, t.id, props.id)
           }
           const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
             props.changeTaskStatus(e.currentTarget.checked, t.id, props.id)
           }

           return <li key={t.id} className={t.isDone ? "is-done" : ""}>
           <input type="checkbox"
                  checked={t.isDone}
                  onChange={onChangeTaskStatusHandler}
           />
           <button onClick={removeTaskHandler}>x</button>
           <EditableSpun
              title={t.title}
              onChange={onChangeTaskTitleHandler}
             />
         </li>})}
       </ul>
       <div>
         <button className={props.filter === 'all'? 'active-filter' : ''} onClick={allClickHandler}>All</button>
         <button className={props.filter === 'active'? 'active-filter' : ''} onClick={activeClickHandler}>Active</button>
         <button className={props.filter === 'completed'? 'active-filter' : ''} onClick={completedClickHandler}>Completed</button>
       </div>

     </div>
  )
}

