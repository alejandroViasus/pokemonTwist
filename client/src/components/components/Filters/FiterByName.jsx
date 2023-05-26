import React from 'react'
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { filterList } from '../../../redux/actions';

function FiterByName() {
  const dispatch=useDispatch();
  const datafilterList=useSelector(state=>state.filtersList);

  const onChange=(e)=>{
    const value=e.target.value;
    //console.log("inputName", isNaN(value));
    if(isNaN(value)){
      const newfilterList={...datafilterList,name:value,noPokedex:""}
      //console.log(newfilterList)
      dispatch(filterList(newfilterList))
    }else{
      const newfilterList={...datafilterList,noPokedex:value,name:""}
      dispatch(filterList(newfilterList))
    }



  }

  return (
        <div>
          FilterByName: 
          <form action="">
            <input type="text" name="name" id={`input-name`} onChange={onChange} placeholder={`name or NoPokedex`} />
          </form>
        </div>
      );
}

export default FiterByName


// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { filterList } from '../../../redux/actions';

// function FilterByName() {
//   const dispatch = useDispatch();
//   const filters = useSelector((state) => state.filterList);

//   const [state, setState] = useState({
//     name: "",
//   });

//   useEffect(() => {
//     const filterList_ = [];
//     for (const key in state) {
//       if (state[key].length > 0) {
//         filterList_.push([key, state[key]]);
//       }
//     }
//     dispatch(filterList(filterList_));
//   }, [state]);

//   const onChange = (e) => {
//     console.log(e.target.value);
//     setState({ ...state, [e.target.name]: e.target.value });
//   };

//   return (
//     <div>
//       FilterByName: {state.name}
//       <form action="">
//         <input type="text" name="name" onChange={onChange} />
//       </form>
//     </div>
//   );
// }

// export default FilterByName;
