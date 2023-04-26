import React from 'react';
import './App.css';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {Menu} from "@mui/icons-material";
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {ErrorSnackbar} from "../components/errorSnackbar/ErrorSnackbar";
import {useAppSelector} from "./hooks";
import {Login} from "../features/Login/Login";
import {BrowserRouter, Route} from "react-router-dom";

type PropsType = {
  demo?: boolean
}

export function App({demo=false}: PropsType) {
  const status = useAppSelector(state => state.app.status)

  console.log("app")

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
           <Button color="inherit" style={{padding: '25px'}}>All Todolists</Button>
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


