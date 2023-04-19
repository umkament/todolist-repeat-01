import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {LibraryAdd} from "@mui/icons-material";

export type AddItemFormPropsType = {

  addItem: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
  console.log("additemform")
  let [taskTitle, setTaskTitle] = useState("")
  let [error, setError] = useState<string>('')

  const taskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
    /* if (e.currentTarget.value.trim() === "") {
       setError("title is required")
     }*/ // это условие лишнее
  }
  const taskTitleKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

    setError('')
    if (e.charCode === 13 && taskTitle.trim() !== "") {
      props.addItem(taskTitle.trim());
      setTaskTitle("")
    }
    if (e.charCode === 13 && taskTitle.trim() === "") {
      setError("title is required")
    }
  }

  const addTaskButtonClickHandler = () => {
    if (taskTitle.trim() !== "") {
      props.addItem(taskTitle.trim());
      setTaskTitle("")
    } else {
      setError("title is required")
    }
  }

  return (
     <div>
       <TextField
          value={taskTitle}
          onChange={taskTitleChangeHandler}
          onKeyPress={taskTitleKeyPressHandler}
          variant={'filled'}
          label={'Type title'}
          error={!!error}
          helperText={error}
       />
       <IconButton onClick={addTaskButtonClickHandler}>
         <LibraryAdd/>
       </IconButton>
     </div>
  )
})