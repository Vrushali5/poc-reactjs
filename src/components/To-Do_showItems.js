import React, { useEffect, useRef, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ToDoButton from "./To-Do_button";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from "primereact/inputtext";
import DisplaySpinner from "./To-Do_spinner";


const DisplayItems = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('AddedItems')) {
            let productsArray = JSON.parse(localStorage.getItem('AddedItems'));
            setLoading(true);
            {loading === true ? <DisplaySpinner /> : 
            setTimeout(() => {
                setProducts(productsArray);
                setLoading(false);
            }, 500);
            }
            
        } else {
            setProducts([]);
        }
        initFilters();  
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const handleClick =  (data, str) => {
        setLoading(true);
        let isRecordExists = JSON.parse(localStorage.getItem('AddedItems'));
            isRecordExists.map((record) => {
                if(str === 'delete') {
            if(record.item === data.item && record.isActivated === data.isActivated){
                isRecordExists.splice(isRecordExists.indexOf(record),1);
                
                localStorage.clear();
                if(isRecordExists.length > 0){
                    localStorage.setItem('AddedItems', JSON.stringify(isRecordExists));
                    setTimeout(() => {
                        setProducts(isRecordExists);
                        setLoading(false);
                    }, 500);
                    
                } else {
                    setTimeout(() => {
                        setProducts([]);
                        setLoading(false);
                    });
                    
                }
            }
        }  else if (str === 'complete') {
            if(data.item === record.item && data.isActivated === 'Activated'){
                isRecordExists.splice(isRecordExists.indexOf(record),1);
                localStorage.clear();
                isRecordExists.push({...data, isCompleted: 'Completed' });
                localStorage.setItem('AddedItems', JSON.stringify(isRecordExists));
                setTimeout(() => {
                    setProducts(isRecordExists);
                    setLoading(false);
                }, 500);
            }
        }  else {
            if(data.item === record.item && data.isActivated === 'Not Activated'){
                isRecordExists.splice(isRecordExists.indexOf(record),1);
                localStorage.clear();
                isRecordExists.push({...data, isActivated: 'Activated' });
                console.log(isRecordExists);
                localStorage.setItem('AddedItems', JSON.stringify(isRecordExists));
                setTimeout(() => {
                    setProducts(isRecordExists);
                    setLoading(false);
                }, 500);
            }
        }              
            })    
    }


    const actionTemplate = (data) => {
        return(
            <>
             {data.isActivated === 'Activated' && data.isCompleted === 'Completed' ? <ToDoButton name="Delete" optionlabel="Delete"   onChildClick={() => handleClick(data, 'delete')}/> : ''}
             {data.isActivated === 'Activated' && data.isCompleted !== 'Completed'? <ToDoButton name="Complete" optionlabel="Complete"   onChildClick={() => handleClick(data, 'complete')}/> : ''}
             {data.isActivated !== 'Activated' && data.isCompleted !== 'Completed'? <ToDoButton name="Activate" optionlabel="Activate"   onChildClick={() => handleClick(data, 'activate')}/> : ''}
            </>
       
        )
    }   

    const clearFilter = () => {
        initFilters();
    };
    
    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.EQUALS },
        });
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <ToDoButton type="button" name="Clear" outlined onChildClick={clearFilter} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" /> <span>&nbsp;</span>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const header = renderHeader();

    return (<>
         {loading === true ? <DisplaySpinner /> : <>{products.length != 0 ? <div style={{marginTop: '10px'}}>
            <DataTable value={products} paginator rows={5}  
            filters={filters} filterDisplay="row" 
             header={header}
                    emptyMessage="No customers found."
                globalFilterFields={['isActivated', 'isCompleted']} tableStyle={{ minWidth: '50rem' }}>
                <Column field="item" header="Item"></Column>
                <Column field="isActivated"  header="Activate Status"></Column>
                <Column field="isCompleted" header="Complete Status"></Column>
                <Column  header="Action" body={actionTemplate}  ></Column>
            </DataTable>
        </div> : <span style={{ marginTop: '108px' , marginLeft: '350px', display: 'flex'}}>
            Currently no items to display!
        </span>}</>
}
           
        
    </>)
}

export default DisplayItems;