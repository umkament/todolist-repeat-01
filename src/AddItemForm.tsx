import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
  let [taskTitle, setTaskTitle] = useState<string>('')
  let [error, setError] = useState<string>('')

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }
  const enterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('')
    if (e.charCode === 13 && taskTitle.trim() === '') {
      setError('title is required')
    }
    if (e.charCode === 13 && taskTitle.trim() !== '') {
      props.addItem(taskTitle.trim())
      setTaskTitle('')
    }
  }
  const addTaskButtonHandler = () => {
    setError('')
    if (taskTitle.trim() !== '') {
      props.addItem(taskTitle)
      setTaskTitle('')
    } else {
      setError('title is required')
    }
  }

  return (
     <div> <input
        value={taskTitle}
        onChange={onChangeInputHandler}
        onKeyPress={enterPressHandler}
        className={error ? 'error' : ''}
     />
       <button
          onClick={addTaskButtonHandler}
       >+
       </button>
       {error && <div className='error-message'>{error}</div>}</div>)

    }