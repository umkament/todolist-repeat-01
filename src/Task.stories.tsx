import {action} from "@storybook/addon-actions";
import {Task} from "./Task";


export default {
  title: 'Task Component',
  component: Task
}

export const TaskBaseElement = (props: any) =>{
  return <>
  <Task removeTask={action('Task removed')}
               changeTaskStatus={action('task status changed')}
               changeTaskTitle={action('task title changed')}
               t={{id: "1", title: "React", isDone: false}}
               todolistID={'todolistID1'}/>
  <Task removeTask={action('Task removed')}
        changeTaskStatus={action('task status changed')}
        changeTaskTitle={action('task title changed')}
        t={{id: "2", title: "Redux", isDone: true}}
        todolistID={'todolistID2'}/>
  </>
}
