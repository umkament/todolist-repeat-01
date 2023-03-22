import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {EditableSpan} from "./EditableSpun";

import {TaskStatuses, TaskType} from "./api/todolists-api";

export type TaskPropsType = {
  removeTask: (id: string, todolistId: string) => void
  changeTaskStatus: (taskID: string, status: TaskStatuses, todolistId: string) => void
  changeTaskTitle: (taskID: string, newTitle: string, todolistId: string) => void
  t: TaskType
  todolistID: string
}
export const Task = React.memo((props: TaskPropsType) => {
  console.log("task")
  const removeTaskHandler = () => {
    props.removeTask(props.t.id, props.todolistID)
  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.t.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistID)
  }

  const changeTaskTitleHandler = useCallback((newTitle: string) => {
    props.changeTaskTitle(props.t.id, newTitle, props.todolistID)
  }, [props.changeTaskTitle, props.t.id, props.todolistID])


  return <div key={props.t.id} className={props.t.status === TaskStatuses.Completed ? "is-done" : ""}>
    <IconButton onClick={removeTaskHandler}>
      <Delete/>
    </IconButton>
    <Checkbox onChange={changeTaskStatusHandler}
              checked={props.t.status === TaskStatuses.Completed}
              color={'default'}
    />
    <EditableSpan
       title={props.t.title}
       onChange={changeTaskTitleHandler}
    />
  </div>
})