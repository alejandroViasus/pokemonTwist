
import React from 'react'
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';

//!components

import FilterByName from './FiterByName';
import FilterByType from './FilterByType';
import FilterDesplegable from './FilterDesplegable'


function Filter() {
    const filters=useSelector(state=>state.filtersList);
    const [state,setState]=useState({
        type1:false,
    })
    useEffect(()=>{
       
        if(filters.type1==="all"){
            //console.log("empy")
            setState({...state,type1:false});  
        }

        if(filters.type1!=="all"&&filters.type1!==undefined){
            //console.log("Type2")
            setState({...state,type1:true});
        }

    },[filters])

  return (
    <div>
         <div>
             <div className="boleans">
                 
             </div>
             <div className="filters">
                <FilterByName />
                <FilterByType />
                {state.type1&& <FilterByType id='2' />} 
                <FilterDesplegable name={`stadistic`}/>
                
             </div>
         </div>
    </div>
  )
}
export default Filter;