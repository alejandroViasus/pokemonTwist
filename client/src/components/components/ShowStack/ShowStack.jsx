import React from 'react'
import { variables, functions } from '../../../assets/variables'

import Separator from "../separator/Separator"

import IconHeadl from "../../../assets/svg/icons/iconHeald.svg"
import IconShield from "../../../assets/svg/icons/iconShield.svg"
import IconShieldPlus from "../../../assets/svg/icons/iconShield+.svg"
import IconSword from "../../../assets/svg/icons/iconSword.svg"
import IconSwordPlus from "../../../assets/svg/icons/iconSword+.svg"
import IconSpeed from "../../../assets/svg/icons/iconSpeed.svg"

function ShowStack({ stack, infoPokemon }) {
    let value = 0;
    let color = `rgba(222,222,222,0.3)`
    let icon=IconHeadl;
    
    if (stack == "HP") {
        value = functions.showStat(infoPokemon, variables.stadistic[1][0]);
        color = `rgba(200, 55, 55,1)`
        icon=IconHeadl;
    }
    if (stack == "ATK") {
        value = functions.showStat(infoPokemon, variables.stadistic[3][0]);
        color = `rgba(0, 136, 170,1)`
        icon=IconSword;
    }
    if (stack == "DFS") {
        value = functions.showStat(infoPokemon, variables.stadistic[5][0]);
        color = `rgba(72, 142, 15,1)`
        icon=IconShield;
    }
    if (stack == "ATK+") {
        value = functions.showStat(infoPokemon, variables.stadistic[7][0]);
        icon=IconSwordPlus;
        color = `rgba(2, 48, 71,1)`
        
        
    }
    if (stack == "DFS+") {
        value = functions.showStat(infoPokemon, variables.stadistic[9][0]);
        icon=IconShieldPlus;
        color = `rgba(97, 155, 138,1)`
    }
    if (stack == "SPD") {
        value = functions.showStat(infoPokemon, variables.stadistic[11][0]);
        icon=IconSpeed;
        color = `rgba(254, 127, 45,1)`
    }

    return (
        <div className='content-stat' style={{ backgroundColor: `${color}` }}>
            <div className="value">{Math.round(value)}</div>
            <img className='icon-stack' src={icon} alt="" />
        </div>
    )
        
}

export default ShowStack


// <div className='content-stat' style={{ backgroundColor: `${color}` }}>
        //     <div className="stat-name">{stack}</div>
        //     <div className="separate">
        //         <Separator height={`2`} color='rgba(255,255,255,0.5)' />
        //     </div>
        //     <div className="value">{value}</div>
        // </div>