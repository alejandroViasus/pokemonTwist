import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect ,useState} from 'react'
import { filterList } from '../../../redux/actions';
function FilterItem({ name, value ,id="inputName"}) {
  const dispatch=useDispatch();
  const datafilterList = useSelector(state => state.filtersList);
  //console.log("dataFilterList ____",datafilterList)
  const [state,setState]=useState({list:datafilterList})

  useEffect(()=>{
    //console.log(state.list)
    dispatch(filterList(state.list))
  },[state])

  const closeItem=()=>{
    //console.log("ttttttttttttttttttttttt",state.list[name])
    if(name==="name"||name==="noPokedex"){
      setState({...state,list:{...state.list,[name]:""}})
      document.getElementById("input-name").value="";
    }else if(name==="stadistic"){
      document.getElementById("input-stadistic").value="---";
      setState({...state,list:{...state.list,[name]:"all"}})
    }
    else{
      setState({...state,list:{...state.list,[name]:"all"}})
      document.getElementById(id).value="all"
    }
  }
  return (
    <div>
      <div className="values">
        {name} : {value}
      </div>
      <div className="close" onClick={closeItem} >{`(X)`}</div>

    </div>
  )
}

export default FilterItem