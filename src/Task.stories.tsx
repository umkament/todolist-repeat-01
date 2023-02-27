import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";


export default {
  title: 'Task Component',
  component: Task
}


export const TaskBaseElement = (props: any) => {
  return <>
    <Task removeTask={action('Task removed')}
          changeTaskStatus={action('task status changed')}
          changeTaskTitle={action('task title changed')}
          t={{
            id: "1",
            title: "React",
            status: TaskStatuses.New,
            description: "",
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: 'todolistID1',
            order: 0,
            addedDate: ''
          }}
          todolistID={'todolistID1'}/>
    <Task removeTask={action('Task removed')}
          changeTaskStatus={action('task status changed')}
          changeTaskTitle={action('task title changed')}
          t={{
            id: "2",
            title: "Redux",
            status: TaskStatuses.Completed,
            description: "",
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: 'todolistID2',
            order: 0,
            addedDate: ''
          }}
          todolistID={'todolistID2'}/>
  </>
}
