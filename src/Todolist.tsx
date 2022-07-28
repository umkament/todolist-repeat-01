import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type PropsType={
  id: string
  title: string
  tasks: Array<TaskType>
  addTask: (title: string, todolistID: string)=>void
  removeTask: (id: string, todolistID: string)=>void
  filter: FilterValuesType
  changeTaskStatus: (isDone: boolean, id: string, todolistID: string)=>void
  changeFilterForTasks: (value: FilterValuesType, todolistID: string) =>void
  removeTodolist: (todolistID: string) =>void
  changeTaskTitle: (taskID: string, newTitle: string, todolistID: string)=>void
  changeTodolistTitle: (todolistID: string, newTitle: string)=>void
}



export function Todolist(props: PropsType) {


  const removeTodolistHandler = () =>props.removeTodolist(props.id)

  const AllClickHandler = ()=>{props.changeFilterForTasks("all",props.id)}
  const ActiveClickHandler = ()=>{props.changeFilterForTasks("active",props.id)}
  const CompletedClickHandler = ()=>{props.changeFilterForTasks("completed",props.id)}

  const addTask = (title: string) => props.addTask(title, props.id)

    const changeTodolistTitleHandler = (newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle)
    }


  return (
     <div>
       <h3>
         <EditableSpan
            title={props.title}
            onChange={changeTodolistTitleHandler}/>
         <button
            onClick={removeTodolistHandler}
         >x</button>
       </h3>
      <AddItemForm addItem={addTask}/>
       <ul>
         {
           props.tasks.map((t)=>{

             const removeTaskHandler = ()=>props.removeTask(t.id,props.id)
             const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>)=>{
               props.changeTaskStatus(e.currentTarget.checked, t.id, props.id)
             }
             const onChangeTaskTitleHandler = (newTitle: string)=>{
               props.changeTaskTitle(t.id, newTitle, props.id)
             }

             return <li key={t.id}
                        className={t.isDone? "is-done": ''}
             >
               <button onClick={removeTaskHandler}>x</button>
               <input type="checkbox"
                      checked={t.isDone}
                      onChange={changeTaskStatusHandler}

               />
              <EditableSpan
                 title={t.title}
                 onChange={onChangeTaskTitleHandler}
              />
             </li>
           })
         }
       </ul>
       <div>
         <button className={props.filter ==="all"? 'active-filter': ''} onClick={AllClickHandler}>All</button>
         <button className={props.filter ==="active"? 'active-filter': ''} onClick={ActiveClickHandler}>Active</button>
         <button className={props.filter ==="completed"? 'active-filter': ''} onClick={CompletedClickHandler}>Completed</button>
       </div>
     </div>
  )
}

