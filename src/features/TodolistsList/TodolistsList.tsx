import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
  addTodolistsTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValueType,
  removeTodolistsTC,
  TodolistDomainType
} from "../../state/todolists-reducer";
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskTC} from "../../state/tasks-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export type TodolistsListPropsType = {}
export const TodolistsList: React.FC<TodolistsListPropsType> = (props) => {
  const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
  const tasksObj = useAppSelector<TaskStateType>(state => state.tasks)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodolistsTC());
  }, [])

  const removeTask = useCallback(function (id: string, todolistId: string) {
    dispatch(removeTaskTC(id, todolistId))
  }, [])

  const addTask = useCallback(function addTask(title: string, todolistId: string) {
    dispatch(addTaskTC(title, todolistId))
  }, [])

  const changeTaskStatus = useCallback(function changeTaskStatus(taskID: string, status: TaskStatuses, todolistId: string) {
    dispatch(updateTaskTC(taskID, {status}, todolistId))
  }, [])

  const changeTaskTitle = useCallback(function changeTaskTitle(taskID: string, newTitle: string, todolistId: string) {
    dispatch(updateTaskTC(taskID, {title: newTitle}, todolistId))
  }, [])

  const changeTodolistTitle = useCallback(function changeTodolistTitle(todolostId: string, newTitle: string) {
    dispatch(changeTodolistTitleTC(todolostId, newTitle))
  }, [])

  const changeTasksFilter = useCallback(function changeTasksFilter(todolistId: string, value: FilterValueType) {
    dispatch(changeTodolistFilterAC(todolistId, value))
  }, [])

  const removeTodolist = useCallback(function removeTodolist(todolistId: string) {
    dispatch(removeTodolistsTC(todolistId));
  }, [])

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistsTC(title))
  }, [])

  return <>
    <Grid container
          style={{padding: '25px'}}>
      <AddItemForm addItem={addTodolist}/>
    </Grid>
    <Grid container
          style={{padding: '25px'}}
    >
      {
        todolists.map(tl => {

          let tasksForTodolist = tasksObj[tl.id];

          return <Grid item
                       style={{padding: '10px'}}
          >
            <Paper style={{padding: '25px'}}
                   elevation={5}
            >
              <Todolist
                 key={tl.id}
                 id={tl.id}
                 title={tl.title}
                 tasks={tasksForTodolist}
                 filter={tl.filter}
                 addTask={addTask}
                 removeTask={removeTask}
                 changeTasksFilter={changeTasksFilter}
                 changeTaskStatus={changeTaskStatus}
                 removeTodolist={removeTodolist}
                 changeTaskTitle={changeTaskTitle}
                 changeTodolistTitle={changeTodolistTitle}
              />
            </Paper>
          </Grid>
        })
      }
    </Grid>
  </>

}