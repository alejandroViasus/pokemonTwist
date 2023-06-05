import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { variables } from '../../../assets/variables';
import { functionsBattle } from './BattleFielt';
import { nextMatch ,dispatchState} from '../../../redux/actions';

//! comonents 

import PokemonInBattle from "../PokemonInBattle/PokemonInBattle"

function BattleField() {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);

  //!........................................COUNTER
  const [counter, setCounter] = useState(globalState.battle.timmer||0);
  useEffect(() => {
    if (counter !== 0) {
      console.log(counter)
      const intervalCounter = setTimeout(() => {
        if (counter > 0) {
          setCounter(counter - 1)
        } else {
          clearInterval(intervalCounter);
        }
      }, 1000)
    } else {
      console.log("00",globalState)
      setState({ ...state, battle: { ...state.battle, startBattle: true } })
    }
  }, [counter]);




  //!.....................................STATE
  const [state,setState]=useState(globalState);

  useEffect(() => {

      if (state.battle.startBattle === true) {
        console.log("start Batle",state)
      }
      console.log(state.rival.team.selected.heald,state.you.team.selected.heald)
      //!! no esta funcionando el selectroe del pokemon del usuario ( SELECTED )
    if (state.rival.team.selected.heald>0 && state.you.team.selected.heald>0) {
      console.log("%%", state.battle.startBattle)
        const newBattle = functionsBattle.setBattlePokemon({ ...state })
        //console.log("state...component", { ...state.battle })
        console.log("newState...component", newBattle)
        const intervalCounter = setTimeout(() => {

          setState(newBattle)
        }, 16)
      }
    
  }, [state.battle])



  const nextMatchUp = (pokemon,user,banPokemons) => {
    console.log("reMatch")



    const newState={...state}
    let index=Math.round(Math.random()*(newState[user].team.pokemons.length-1))
    if(index<=0){index=0};
    console.log(index)
    if(
      newState[user].team.pokemons[index].heald===100&&
      newState[user].team.selected.indexPokemon!==index
      ){
      const nextPokemon=newState[user].team.pokemons[index]
      dispatch(nextMatch(pokemon,user,nextPokemon))
    }else{
      console.log("again",index)
      let count=0;
      newState[user].team.pokemons.map((pokemon)=>{
        if(pokemon.heald===0){
          count++;
        }
      })

      if(count>=newState[user].team.pokemons.length-1){
        endBattle(user);
      }else{
        console.log("counter: ", count ,newState[user].team.pokemons.length)
        nextMatchUp(pokemon,user,banPokemons)
      }
    }
  }

  const endBattle=(lose)=>{
    const newState={...state};
    newState.battle.finalBattle=true;
    newState.battle.loseBattle=lose
    dispatch(dispatchState(newState))
  }



  let sizeUpokemon = globalState.you.team.selected?.height / 10 || 1;
  let sizeRivalpokemon = globalState.rival.team.selected?.height / 10 || 1;

  const scaleSize=[1.2,4]

  if (sizeUpokemon <= scaleSize[0]) {
    sizeUpokemon = scaleSize[0];
  }
  if (sizeRivalpokemon <= scaleSize[0]) {
    sizeRivalpokemon = scaleSize[0];
  }

  if (sizeUpokemon >= scaleSize[1]) {
    sizeUpokemon = scaleSize[1];
  }
  if (sizeRivalpokemon >= scaleSize[1]) {
    sizeRivalpokemon = scaleSize[1];
  }

  return (
    <div>


      <div className="content-battleField">
        <div className="stadium" style={{ display: "flex", flexDirection: "column" }}>
          <div className="battleField" id="battleField-stadium"
            style={{ backgroundColor: "rgba(200,200,200,0.8)", borderRadius: "0%" }}
          >
            <div className="place-pokemon-inBattle" id="pokemon-user-inbattle"
              style={{
                height: `${(sizeUpokemon) * 4}vw`,
                width: `${(sizeUpokemon) * 4}vw`,
              }}
            >
              <PokemonInBattle role="user" pokemon={state.you.team.selected} />
            </div>
            <div className="timmer" id="timmer">
              {counter}
            </div>
            <div className="timmer" id="obstacule1" style={{ backgroundColor: "blue", height: "0vw", width: "0vw", position: "relative", top: "0%", left: "-10%", borderRadius: "2vw", transform: `rotate(10deg)` }} > </div>


            <div className="place-pokemon-inBattle" id="pokemon-rival-inbattle"
              style={{
                height: `${(sizeRivalpokemon) * 3}vw`,
                width: `${(sizeRivalpokemon) * 3}vw`,
              }}
            >
              <PokemonInBattle role="rival" pokemon={state.rival.team.selected} />
            </div>
          </div>
          <div>uPokemon: {state.you.team.selected?.name}: {globalState.you.team.selected?.hp}</div>
         
        </div>
      </div >


      <button onClick={()=>nextMatchUp(state.you.team.selected,"you")}>
        nextMatch User
      </button>
      <button onClick={()=>nextMatchUp(state.rival.team.selected,"rival")}>
        nextMatch Rival
      </button>
    </div>
  )
}

export default BattleField

// import React, { useState, useEffect } from "react";
// import { functions, variables } from "../../../assets/variables";
// import { functionsBattle } from "./BattleFielt";
// import PokemonInBattle from "../PokemonInBattle/PokemonInBattle";

// function BattleField({ lstate, ready }) {
//   console.log(lstate)
//   const replicState = {
//     ...lstate,
//     battle: {
//       ...lstate.battle,
//       startBattle: false,
//       uPokemon: {
//         hp: functions.showStat(lstate.you.team.selected, variables.stadistic[1][0]),
//         attack: functions.showStat(lstate.you.team.selected, variables.stadistic[3][0]),
//         deffence: functions.showStat(lstate.you.team.selected, variables.stadistic[5][0]),
//         attackPlus: functions.showStat(lstate.you.team.selected, variables.stadistic[7][0]),
//         defencePlus: functions.showStat(lstate.you.team.selected, variables.stadistic[9][0]),
//         rating: functions.showStat(lstate.you.team.selected, variables.stadistic[11][0]),
//         speed: functions.showStat(lstate.you.team.selected, variables.stadistic[13][0]),
//         speedX: 1,
//         speedY: 1,
//         types: functions.showTypes(lstate.you.team.selected.types),
//         positionX: 0,
//         positionY: 0,
//         rotation: 0,
//         actualHealdToCero: 0,//esta propiedad va a hacer un conteo positivo hasta llegar al valor total de la salud total del pokemon , cuando ese valor llegue o sobrepaso el pokemon quedara debilitado
//         initialPosition: true,
//         life: true,
//         direction: functionsBattle.getStartDiretion(functions.showStat(lstate.you.team.selected, variables.stadistic[13][0])),
//       },
//       rivalPokemon: {
//         name: lstate.rival.team.selected.name,
//         hp: functions.showStat(lstate.rival.team.selected, variables.stadistic[1][0]),
//         attack: functions.showStat(lstate.rival.team.selected, variables.stadistic[3][0]),
//         deffence: functions.showStat(lstate.rival.team.selected, variables.stadistic[5][0]),
//         attackPlus: functions.showStat(lstate.rival.team.selected, variables.stadistic[7][0]),
//         defencePlus: functions.showStat(lstate.rival.team.selected, variables.stadistic[9][0]),
//         rating: functions.showStat(lstate.rival.team.selected, variables.stadistic[11][0]),
//         speed: functions.showStat(lstate.rival.team.selected, variables.stadistic[13][0]),
//         speedX: 1,
//         speedY: 1,
//         types: functions.showTypes(lstate.rival.team.selected.types),
//         positionX: 0,
//         positionY: 0,
//         rotation: 0,
//         actualHealdToCero: 0,//esta propiedad va a hacer un conteo positivo hasta llegar al valor total de la salud total del pokemon , cuando ese valor llegue o sobrepaso el pokemon quedara debilitado
//         initialPosition: true,
//         life: true,
//         direction: functionsBattle.getStartDiretion(functions.showStat(lstate.rival.team.selected, variables.stadistic[13][0])),
//       },

//     }
//   } || {};
//   const [state, setState] = useState(replicState);
//   

  



//   useEffect(() => {

//     if (state.battle.uPokemon.life === false || state.battle.rivalPokemon.life === false) {

//       if(!state.battle.uPokemon.life){
//         ready(state.battle.uPokemon,"you");
//       }else{
//         ready(state.battle.rival,"rival");
//       }

//     }
//   }, [state.battle.uPokemon.life, state.battle.rivalPokemon.life])

//   





//

// export default BattleField;
