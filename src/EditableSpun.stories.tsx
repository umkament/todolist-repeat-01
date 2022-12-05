import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpun";


export default {
  title: 'EditableSpan Component',
  component: EditableSpan
}

export const EditableSpanBaseElement = (props: any) =>{
  return <EditableSpan title={"title"} onChange={action('title changed')}/>
}
