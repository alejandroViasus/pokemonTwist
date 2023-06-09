import React from 'react'
import { variables, functions } from '../../../assets/variables'

import Separator from "../separator/Separator"

function ShowStack({ stack, infoPokemon }) {
    let value = 0;
    let color = `rgba(222,222,222,0.3)`
    if (stack == "HP") {
        value = functions.showStat(infoPokemon, variables.stadistic[1][0]);
        color = `rgba(200, 55, 55,1)`
    }
    if (stack == "ATK") {
        value = functions.showStat(infoPokemon, variables.stadistic[3][0]);
        color = `rgba(0, 136, 170,1)`
    }
    if (stack == "DFS") {
        value = functions.showStat(infoPokemon, variables.stadistic[5][0]);
        color = `rgba(72, 142, 15,1)`
    }
    if (stack == "ATK+") {
        value = functions.showStat(infoPokemon, variables.stadistic[7][0]);
    }
    if (stack == "DFS+") {
        value = functions.showStat(infoPokemon, variables.stadistic[9][0]);
    }
    if (stack == "SPD") {
        value = functions.showStat(infoPokemon, variables.stadistic[11][0]);
    }

    return (
        <div className='content-stat' style={{ backgroundColor: `${color}` }}>
            <div className="stat-name">{stack}</div>
            <div className="separate">
                <Separator height={`2`} color='rgba(255,255,255,0.5)' />
            </div>
            <div className="value">{value}</div>
        </div>
    )
}

export default ShowStack