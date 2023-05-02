import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {Menu} from "@mui/icons-material";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography
} from "@mui/material";
import {ErrorSnackbar} from "../components/errorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "./hooks";
import {Login} from "../features/Login/Login";
import {BrowserRouter, Route} from "react-router-dom";
import {initializeAppTC} from "../state/app-reducer";
import {logOutTC} from "../state/login-reducer";

type PropsType = {
  demo?: boolean
}

export function App({demo=false}: PropsType) {
  const dispatch=useAppDispatch()
  const status = useAppSelector(state => state.app.status)
  const initialized = useAppSelector<boolean>(state => state.app.initialized)
  const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
  console.log("app")

  useEffect(()=>{
    dispatch(initializeAppTC())
  },[])

  const logOutHandler = useCallback(()=>{
    dispatch(logOutTC())
  }, [])

  if(!initialized){
    return <div style={{position:'fixed', top:'30%', width: '100%', textAlign: 'center'}}>
      <CircularProgress/>
    </div>
  }


  return (
     <BrowserRouter>
     <div className="App">
 <ErrorSnackbar/>
       <AppBar position="static"
               color={'default'}
       >
         <Toolbar>
           <IconButton
              edge="start"
              color="default"
              aria-label="menu">
             <Menu/>
           </IconButton>
           <Typography variant="h6">
             settings
           </Typography>
           {isLoggedIn && <Button onClick={logOutHandler} color="inherit" style={{padding: '25px'}}>Log out</Button>}
         </Toolbar>
       {status === 'loading' && <LinearProgress color={'primary'}/>}
       </AppBar>
       <Container fixed>
         <Route exact path='/' render={()=><TodolistsList demo={demo}/>} />
         <Route path='/login' render={()=><Login/>} />


       </Container>
     </div>
     </BrowserRouter>
  );
}


