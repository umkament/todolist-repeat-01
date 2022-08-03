import {ChangeEvent, useState} from "react";

export type EditableSpunPropsType = {
title: string
  onChange: (newTitle: string)=>void
}

export function EditableSpun(props: EditableSpunPropsType) {

  let [editMode, setEditMode] = useState<boolean>(false)
  let [title, setTitle] = useState<string>('')

  const activeEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const activeViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }

  const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
        ? <input
           onBlur={activeViewMode}
           value={title}
           autoFocus
           onChange={onChangeTaskTitleHandler}
        />
        : <span onDoubleClick={activeEditMode}>{props.title}</span>

}