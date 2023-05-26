import React from 'react'
import { useState, useEffect } from 'react';
import { variables } from '../../../assets/variables';
import { useSelector, useDispatch } from 'react-redux';
import { filterList } from '../../../redux/actions';


function FilterByType({ id = "1" }) {
    const dispatch = useDispatch();
    const datafilterList = useSelector(state => state.filtersList);

    let inputType1 = document.getElementById("input-type1") || undefined;
    let inputType2 = document.getElementById("input-type2") || undefined;

    const [state, setState] = useState({
        types: variables.types,
        list: {},
    });

    useEffect(() => {
        //console.log(datafilterList)
        setState({ ...state, list: datafilterList })
    }, [datafilterList])


    useEffect(() => {
        const selecttype = `type${id}`
        if (state.list[selecttype]) {
            //console.log("state", state)
            dispatch(filterList(state.list))
        }
    }, [state])

    const onClick = (e) => {
        let selecttype = `type${id}`
        let trace = false;
        let vequals = false;
        const value = e.target.value;
        if (state.list.type1 === value && selecttype === `type2` || state.list.type2 === value && selecttype === `type1`) {
            selecttype = `type1`
            vequals = true;
            inputType1.value = e.target.value;
            if (inputType2 !== undefined) {
                inputType2.value = "all";
            }
        }
        if (
            (selecttype === "type2" && datafilterList.type1 === "all")
            ||
            (selecttype === "type2" && state.list.type1 === undefined)
            ||
            (selecttype === "type2" && state.list.type1 === "all")
        ) {

            console.log("correjido")
            selecttype = `type1`
            inputType1.value = e.target.value;
            if (inputType2 !== undefined) {
                inputType2.value = "all";
            }
        }

        if (
            selecttype == "type1"
            &&
            value === "all"
            &&
            (
                state.list.type2 !== "all"
                ||
                datafilterList.type1 !== "all"
                ||
                state.list.type2 !== undefined
            )
        ) {
            selecttype = "type1";
            inputType1.value = e.target.value;
            if (inputType2 !== undefined) {
                inputType2.value = "all";
            }
            //console.log("final State...........", state)
        }


        if (value === "all" && selecttype === `type1` && (state.list.type2 !== "all" || state.list.type2 !== "" || state.list.type2 !== undefined)&& inputType2!==undefined) {
            selecttype = `type1`
            inputType1.value = state.list.type2;
            console.log(inputType2)
            inputType2.value = "all";
            trace = true;
            //console.log("final State", state, e.target.value)
        }


        if (value !== state.list[selecttype]) {
            //console.log(state)
            if (vequals) {
                const newFilterList = { ...state.list, type1: value, type2: "all" };
                setState({ ...state, list: newFilterList })

            } else if (trace) {
                const otherValue = state.list.type2
                const newFilterList = { ...state.list, type1: otherValue, type2: "all" };
                setState({ ...state, list: newFilterList })
            } else {
                const newFilterList = { ...state.list, [selecttype]: value };
                setState({ ...state, list: newFilterList })
            }
        }
    }

    return (
        <div>
            Filter by type :
            <select name="filterTypes" id={`input-type${id}`} onClick={onClick} >
                {state.types?.map((type, index) => {
                    return <option key={type} value={type} >
                        {type}
                    </option>
                })}
            </select>
        </div>
    )
}

export default FilterByType