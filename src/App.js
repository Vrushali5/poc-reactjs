import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";    
import "primereact/resources/primereact.min.css";
import React, { useState }  from 'react';
import DisplayItems from './components/To-Do_showItems';
import AddItem from './components/To-D0_addItem';
import DisplaySpinner from './components/To-Do_spinner';
import { ProgressSpinner } from 'primereact/progressspinner';

        

function App() { 
  return (
    <>
    <div className='ToDoHeader'>
      <span>To Do List</span>
    </div>
    <div>
   
      <AddItem />
      <DisplayItems/> 
    </div>
    </>
    
  );
}

export default App;
