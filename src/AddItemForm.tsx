import {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormPropsType = {

  addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
  let [newTitle, setNewTitle] = useState<string>('')
  let [error, setError] = useState<string>('')

  const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }
  const onKeyPressTaskTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('')
    if (e.charCode === 13 && newTitle.trim() !== '') {
      props.addItem(newTitle.trim())
      setNewTitle('')
    }
    if (e.charCode === 13 && newTitle.trim() === '') {
      setError('title is required')
    }
  }

  const addNewTaskHandler = () => {
    if (newTitle.trim() !== '') {
      props.addItem(newTitle.trim())
      setNewTitle('')
    } else {
      setError('title is required')
    }
  }

  return (
     <div>
       <input value={newTitle}
              onChange={onChangeTaskTitleHandler}
              onKeyPress={onKeyPressTaskTitleHandler}
              className={error ? 'is-done' : ''}
       />
       <button onClick={addNewTaskHandler}>+</button>
       {error && <div className='error-message'>{error}</div>}
     </div>
  )
}