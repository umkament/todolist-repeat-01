import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";


export function App() {
  console.log("app")

  return (
     <div className="App">
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
           <Button color="default" style={{padding: '25px'}}>All Todolists</Button>
         </Toolbar>
       </AppBar>
       <Container fixed>
        <TodolistsList/>
       </Container>
     </div>
  );
}


