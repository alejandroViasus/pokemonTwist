import React, { useState, useEffect } from "react";
import { functions, variables } from "../../../assets/variables";
import { functionsBattle } from "./BattleFielt";
import PokemonInBattle from "../PokemonInBattle/PokemonInBattle";

function BattleField({ lstate, ready }) {
  const replicState = {
    ...lstate,
    battle: {
      ...lstate.battle,
      startBattle: false,
      uPokemon: {
        hp: functions.showStat(lstate.you.team.selected, variables.stadistic[1][0]),
        attack: functions.showStat(lstate.you.team.selected, variables.stadistic[3][0]),
        deffence: functions.showStat(lstate.you.team.selected, variables.stadistic[5][0]),
        attackPlus: functions.showStat(lstate.you.team.selected, variables.stadistic[7][0]),
        defencePlus: functions.showStat(lstate.you.team.selected, variables.stadistic[9][0]),
        rating: functions.showStat(lstate.you.team.selected, variables.stadistic[11][0]),
        speed: functions.showStat(lstate.you.team.selected, variables.stadistic[13][0]),
        types: functions.showTypes(lstate.you.team.selected.types),
        positionX: 0,
        positionY: 0,
        initialPosition:true,
        direction:functionsBattle.getStartDiretion( functions.showStat(lstate.you.team.selected, variables.stadistic[13][0])),
      },
      rivalPokemon: {
        hp: functions.showStat(lstate.rival.team.selected, variables.stadistic[1][0]),
        attack: functions.showStat(lstate.rival.team.selected, variables.stadistic[3][0]),
        deffence: functions.showStat(lstate.rival.team.selected, variables.stadistic[5][0]),
        attackPlus: functions.showStat(lstate.rival.team.selected, variables.stadistic[7][0]),
        defencePlus: functions.showStat(lstate.rival.team.selected, variables.stadistic[9][0]),
        rating: functions.showStat(lstate.rival.team.selected, variables.stadistic[11][0]),
        speed: functions.showStat(lstate.rival.team.selected, variables.stadistic[13][0]),
        types: functions.showTypes(lstate.rival.team.selected.types),
        positionX: 0,
        positionY: 0,
        rotarion:0,
        initialPosition:true,
        direction:functionsBattle.getStartDiretion( functions.showStat(lstate.rival.team.selected, variables.stadistic[13][0])),
      },

    }
  } || {};
  const [state, setState] = useState(replicState);
  const [counter, setCounter] = useState(5);

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
      console.log("00")
      setState({ ...state, battle: { ...state.battle, startBattle: true } })
    }
  }, [counter]);

  // useEffect(() => {
  //   console.log("%%", state.battle.startBattle)
  //   if (state.battle.startBattle === true) {
  //     const intervalCounter = setTimeout(() => {
       
  //       const uPokemonInBattle=state.battle.uPokemon;
  //       const rivalPokemonInBattle=state.battle.rivalPokemon;

        
        
  //       const moveUPokemon=functionsBattle.movePokemon(uPokemonInBattle,"uPokemon");
  //       const moveRivalPokemon=functionsBattle.movePokemon(rivalPokemonInBattle,"RivalPokemon");




  //       setState({
  //         ...state,
  //         battle:{
  //           ...state.battle,
  //           rivalPokemon:{
  //             ...state.battle.rivalPokemon,
  //             positionX:moveRivalPokemon[0],
  //             positionY:moveRivalPokemon[1]
  //           },
  //           uPokemon:{
  //             ...state.battle.uPokemon,
  //             positionX:moveUPokemon[0],
  //             positionY:moveUPokemon[1]
  //           }
  //         }
  //       })
  //       const $rivalPokemon=document.getElementById("pokemon-rival-inbattle");
  //       const $uPokemon=document.getElementById("pokemon-user-inbattle");
  //       if($rivalPokemon!==undefined&&$rivalPokemon!==null||$uPokemon!==undefined&&$uPokemon!==null){
  //         $rivalPokemon.style.transform=`translate(${moveRivalPokemon[0]}px,${moveRivalPokemon[1]}px)`;

  //         $uPokemon.style.transform=`translate(${moveUPokemon[0]}px,${moveUPokemon[1]}px)`;
  //       }
          
  //     },5000)


  //   }
  // }, [state.battle])


  useEffect(() => {
    console.log("%%", state.battle.startBattle)
    if (state.battle.startBattle === true) {
      const intervalCounter = setTimeout(() => {
       
        setState({
          ...state,
          battle:functionsBattle.battlePokemon(state.battle)
        })
        // const $rivalPokemon=document.getElementById("pokemon-rival-inbattle");
        // const $uPokemon=document.getElementById("pokemon-user-inbattle");
        // if($rivalPokemon!==undefined&&$rivalPokemon!==null||$uPokemon!==undefined&&$uPokemon!==null){
        //   $rivalPokemon.style.transform=`translate(${moveRivalPokemon[0]}px,${moveRivalPokemon[1]}px)`;

        //   $uPokemon.style.transform=`translate(${moveUPokemon[0]}px,${moveUPokemon[1]}px)`;
        // }
          
      },5000)


    }
  }, [state.battle])

  return (
    <div className="content-battleField">
      <div className="stadium">
        <div className="battleField" id="battleField-stadium">
          <div className="place-pokemon-inBattle" id="pokemon-user-inbattle">
            <PokemonInBattle role="user" pokemon={state.you.team.selected} />
          </div>
          <div className="timmer" id="timmer">
            {counter}
          </div>
          <div className="place-pokemon-inBattle" id="pokemon-rival-inbattle">
            <PokemonInBattle role="rival" pokemon={state.rival.team.selected} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BattleField;
