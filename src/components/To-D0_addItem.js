import React, { useEffect, useState } from "react";
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import ToDoButton from "./To-Do_button";
import DisplayItems from "./To-Do_showItems";
import DisplaySpinner from "./To-Do_spinner";

const AddItem = () => {
 
    const [value, setValue] = useState('');
    const [checked, setChecked] = useState('Not Activated');

    const handleClick = (e) => {
     const data = {
        item: value,
        isActivated: checked,
        isCompleted: 'Not Completed'
     }
     
      if(!localStorage.getItem('AddedItems')) {
        let addedItemPresent = [];
        addedItemPresent.push(data);
      localStorage.setItem('AddedItems', JSON.stringify(addedItemPresent));
      alert("Item Added Successfully!");
     } else {
      let itemExist = false;
      let addedItemDetails = JSON.parse(localStorage.getItem('AddedItems'));
      addedItemDetails.forEach((e) => {
        if(e.item === data.item) {
          itemExist = true;
        }
      });
      if(itemExist == false){
        addedItemDetails.push( data);
        localStorage.setItem('AddedItems', JSON.stringify(addedItemDetails));
        alert("Item Added Successfully!");
      } else {
        alert("Duplicate Items"); 
      }
     }
    
     setValue('');
    }
    return(
        <>
       <div style={{marginTop: '58px',height: '100%',
    width: '50%', outline: 'solid 1px cadetblue', display: 'inline-flex',
    justifyContent: 'center',alignItems: 'center', marginLeft: '180px'}}>
        <div style={{ marginRight: '146px'}}><span >Add Items:</span></div>
        <div style={{ marginLeft: '-100px'}}>
        <form onSubmit={handleClick}>
         <InputText style={{marginLeft: '-18px', marginRight: '21px', marginBottom: '8px', height: '30px'}} value={value} onChange={(e) => setValue(e.target.value)} />
         
         <Checkbox style={{ marginBottom: '10px'}} onChange={e => setChecked('Activated')} checked={checked}></Checkbox>
         <span>&nbsp;</span><label>Activate</label>
         <span style={{marginLeft: '44px'}}><ToDoButton  name="Add" ></ToDoButton></span>
        </form>
        </div>
      </div>
        </>
    )
}

export default AddItem;