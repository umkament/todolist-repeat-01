import React from 'react';
import './App.css';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {Menu} from "@mui/icons-material";
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {ErrorSnackbar} from "../components/errorSnackbar/ErrorSnackbar";
import {useAppSelector} from "./hooks";


export function App() {
  const status = useAppSelector(state => state.app.status)

  console.log("app")

  return (
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
       {/*  <LinearProgress color={'primary'} />*/}
       </AppBar>
       <Container fixed>
        <TodolistsList/>
       </Container>
     </div>
  );
}


