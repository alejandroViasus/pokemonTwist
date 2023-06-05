import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { functions, variables } from '../../../assets/variables'

//! components

import Card from '../Card/Card'
function DisplayEndBattle({ again }) {
    const globalState = useSelector(state => state)
    const [state, settate] = useState(variables.initialState.state)
    useEffect(() => {
        settate(globalState)
    }, [globalState])

    let winner = ""
    if (globalState.battle.loseBattle === "you") {
        winner = state.rival.user.gametag
    } else {
        winner = state.you.user.gametag
    }

    let count=0;
    
    state.you.team.pokemons?.map((infoCard, index) => {
        if(infoCard.heald>0){
            count++
        }
    })
    let socre4pokemon=variables.totalScore4battlePokemon/count

    return (
        <div>
            <div> {winner} winner </div>
            {(winner === state.you.user.gametag) && (
                <div className="teamUser" style={{ display: "flex" }}>
                    {state.you.team.pokemons?.map((infoCard, index) => {
                        let opacity = "1";
                        const rarity=functions.getRarity(state.you.user)
                        if (infoCard.heald === 0) {
                            opacity = "0.5";
                        }else{

                            const updatePokemon=state.you.team.pokemons[index]
                            updatePokemon.actualStack=updatePokemon.actualStack+socre4pokemon;
                            if(updatePokemon.actualStack>=updatePokemon.maxStack4level){
                                const newMaxStack4Level=80+((updatePokemon.level+1)*5)
                                updatePokemon.actualStack=updatePokemon.actualStack-updatePokemon.maxStack4level
                                updatePokemon.level=updatePokemon.level+1;
                                updatePokemon.maxStack4level=newMaxStack4Level
                            }
                            
                            functions.updatePokemon(updatePokemon)
                            
                        }
                        return (
                            <div key={`selector${infoCard.noPokedex}${infoCard.scale}`} className={`pokemon ${state.you.team.selected?._id === infoCard._id ? "selected" : ""}`}index={index}
                                style={{ opacity }}
                            >
                                <Card key={`selector-card${infoCard._id}`} infoPokemon={infoCard} structure='selectorCard' />
                                <div> {(infoCard.heald>0)&&(<div>+{socre4pokemon}</div>)}</div>
                            </div>)

                    })}
                </div>
            )}
            <button onClick={() => { again() }}>again</button>
            <button onClick={() => { again("change-team") }}>change Team</button>
            <button onClick={() => { again("go-to-home") }}> go to home</button>
        </div>
    )
}

export default DisplayEndBattle