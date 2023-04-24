import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
  title: 'AddItemForm Component',
  component: AddItemForm
}

export const AddItemFormBaseElement = (props: any) => {
  return <AddItemForm addItem={action('button add text')}/>
}

export const AddItemFormDisabledExample = (props: any) => {
  return <AddItemForm addItem={action('button add text')}
                      disabled={true}
  />
}
