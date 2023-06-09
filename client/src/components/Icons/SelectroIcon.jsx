import React from 'react'
import IconCards from './IconCards'
import IconTravel from './IconTravel'
import IconBox from './IconBox'
import IconTrainer from './IconTrainer'
import IconLeague from './IconLeague'


import { variables } from '../../assets/variables'

function SelectroIcon({icon,color}) {
  return (
    <div className='content-selector-icon'>
        {(variables.navMenuOptions[0][1]===icon)&&(<IconCards fill={color}/>)}
        {(variables.navMenuOptions[1][1]===icon)&&(<IconBox fill={color}/>)}
        {(variables.navMenuOptions[2][1]===icon)&&(<IconTrainer fill={color}/>)}
        {(variables.navMenuOptions[3][1]===icon)&&(<IconTravel fill={color}/>)}
        {(variables.navMenuOptions[4][1]===icon)&&(<IconLeague fill={color}/>)}
        
    </div>
  )
}

export default SelectroIcon