import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
 title: string
  onChange: (newTitle: string)=> void
}

export function EditableSpan(props: EditableSpanPropsType) {

  let [editMode, setEditMode] = useState<boolean>(false)
  let [title, setTitle] = useState<string>('')

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }

 const onChangeTasksTitleHandler = (e: ChangeEvent<HTMLInputElement>)=>{
    setTitle(e.currentTarget.value)
 }
  return editMode
     ? <input
        onBlur={activateViewMode}
        autoFocus
        value={title}
        onChange={onChangeTasksTitleHandler}
     />
     : <span onDoubleClick={activateEditMode}>{props.title}</span>

}