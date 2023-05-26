import React, { useEffect, useState } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { variables } from '../../../assets/variables';
import { filterList } from '../../../redux/actions';

function FilterDesplegable({ name }) {
  const dispatch=useDispatch();
  const datafilterList = useSelector((state) => state.filtersList);
  const options = variables[name];
  const [state, setState] = useState({
    filterList: {},
    options: [],
  });

  useEffect(() => {
    //console.log("....sasadasd", filterList);
    setState({ ...state, filterList: datafilterList, options });
  }, [filterList]);

  useEffect(() => {
    //console.log("STATE___: ", state)
    dispatch(filterList(state.filterList))
  }, [state])

  const optionSelect = (e) => {
    //console.log(state.filterList.stadistic !== e.target.value)
    if (state.filterList.stadistic !== e.target.value&&e.target.value!=="---") {
      const value=e.target.value;
      const newFilterList = {...datafilterList, stadistic:value};
      setState({ ...state, filterList: newFilterList });
    }
    if(e.target.value==="---"){
      const value="";
      const newFilterList = {...datafilterList, stadistic:value};
      setState({ ...state, filterList: newFilterList });
    }
  }
  return (
    <div>
      <form action="">
        {name}:
        <select name="" id={"input-stadistic"} onClick={optionSelect}>
          {/* {console.log(state.options)} */}
          {state.options?.map((opt, index) => (
            <option key={index} value={opt[0]}>
              {opt[0]}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default FilterDesplegable;
