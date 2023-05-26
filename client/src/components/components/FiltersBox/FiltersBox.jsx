import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import FilterBoleans from '../FilterItem/FilterItem'
import FilterItem from '../FilterItem/FilterItem'

function FiltersBox() {
  const filters = useSelector((state) => state.filtersList)
  //console.log("Filtesbox",filters.filtersList)
  const [state, setState] = useState([])

  useEffect(() => {
    const newState = []
    for (const iterator in filters) {
      //console.log("box", [iterator,filters[iterator]])
      newState.push([iterator, filters[iterator]])
    }
    //console.log( "newState____ :;",newState)
    setState(newState);
  }, [filters])

  return (
    <div>
      {
        state.map((filter) => {
          if (filter[1] !== "" && filter[1] !== "all" && filter[1] !== false) {
            return <div className="placeItem" key={`filterItem-${filter[0]}`}>
              <FilterItem name={filter[0]} value={filter[1]} id={`input-${filter[0]}`} />
            </div>
          }
        })
      }
    </div>
  )
}

export default FiltersBox