import React, { useState } from "react";
import { Button } from 'primereact/button';

        
        


const ToDoButton  = ({name, onChildClick}) => {

    return (
       <>
       <Button style={{height: '30px', marginBottom: '6px',
    paddingTop: '8px', marginTop: '12px'}} label={name}  
     onClick={onChildClick}/>
      
       </>
        
    )
}

export default ToDoButton;