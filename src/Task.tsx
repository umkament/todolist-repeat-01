import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {EditableSpan} from "./EditableSpun";
import {TasksType} from "./Todolist";

export type TaskPropsType = {
  removeTask: (id: string, todolistId: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (taskID: string, newTitle: string, todolistId: string) => void
  t: TasksType
  todolistID: string
}
export const Task = React.memo( (props: TaskPropsType) => {
  console.log("task")
  const removeTaskHandler = () => {
    props.removeTask(props.t.id, props.todolistID)
  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.t.id, e.currentTarget.checked, props.todolistID)
  }

  const changeTaskTitleHandler = useCallback( (newTitle: string) => {
    props.changeTaskTitle(props.t.id, newTitle, props.todolistID)
  }, [props.changeTaskTitle, props.t.id, props.todolistID])


  return <div key={props.t.id} className={props.t.isDone ? "is-done" : ""}>
    <IconButton onClick={removeTaskHandler}>
      <Delete/>
    </IconButton>
    <Checkbox onChange={changeTaskStatusHandler}
              checked={props.t.isDone}
              color={'default'}
    />
    <EditableSpan
       title={props.t.title}
       onChange={changeTaskTitleHandler}
    />
  </div>
})