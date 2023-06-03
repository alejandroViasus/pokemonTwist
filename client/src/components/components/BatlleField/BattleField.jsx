import React, { useState, useEffect } from "react";
import { functions, variables } from "../../../assets/variables";
import { functionsBattle } from "./BattleFielt";
import PokemonInBattle from "../PokemonInBattle/PokemonInBattle";

function BattleField({ lstate, ready }) {
  console.log(lstate)
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
        speedX: 1,
        speedY: 1,
        types: functions.showTypes(lstate.you.team.selected.types),
        positionX: 0,
        positionY: 0,
        rotation: 0,
        actualHealdToCero: 0,//esta propiedad va a hacer un conteo positivo hasta llegar al valor total de la salud total del pokemon , cuando ese valor llegue o sobrepaso el pokemon quedara debilitado
        initialPosition: true,
        life: true,
        direction: functionsBattle.getStartDiretion(functions.showStat(lstate.you.team.selected, variables.stadistic[13][0])),
      },
      rivalPokemon: {
        name: lstate.rival.team.selected.name,
        hp: functions.showStat(lstate.rival.team.selected, variables.stadistic[1][0]),
        attack: functions.showStat(lstate.rival.team.selected, variables.stadistic[3][0]),
        deffence: functions.showStat(lstate.rival.team.selected, variables.stadistic[5][0]),
        attackPlus: functions.showStat(lstate.rival.team.selected, variables.stadistic[7][0]),
        defencePlus: functions.showStat(lstate.rival.team.selected, variables.stadistic[9][0]),
        rating: functions.showStat(lstate.rival.team.selected, variables.stadistic[11][0]),
        speed: functions.showStat(lstate.rival.team.selected, variables.stadistic[13][0]),
        speedX: 1,
        speedY: 1,
        types: functions.showTypes(lstate.rival.team.selected.types),
        positionX: 0,
        positionY: 0,
        rotation: 0,
        actualHealdToCero: 0,//esta propiedad va a hacer un conteo positivo hasta llegar al valor total de la salud total del pokemon , cuando ese valor llegue o sobrepaso el pokemon quedara debilitado
        initialPosition: true,
        life: true,
        direction: functionsBattle.getStartDiretion(functions.showStat(lstate.rival.team.selected, variables.stadistic[13][0])),
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

  useEffect(() => {

    if (state.battle.rivalPokemon.life && state.battle.uPokemon.life) {
      console.log("%%", state.battle.startBattle)
      if (state.battle.startBattle === true) {
        const newBattle = functionsBattle.battlePokemon({ ...state.battle })
        //console.log("state...component", { ...state.battle })
        //console.log("newState...component", newBattle)
        const intervalCounter = setTimeout(() => {

          setState({
            ...state,
            battle: newBattle,
          })
        }, 16)
      }
    }
  }, [state.battle])

  useEffect(() => {

    if (state.battle.uPokemon.life === false || state.battle.rivalPokemon.life === false) {

      if(!state.battle.uPokemon.life){
        ready(state.battle.uPokemon,"you");
      }else{
        ready(state.battle.rival,"rival");
      }

    }
  }, [state.battle.uPokemon.life, state.battle.rivalPokemon.life])

  let sizeUpokemon = state.you.team.selected.height / 10 || 1;
  let sizeRivalpokemon = state.rival.team.selected.height / 10 || 1;

  if (sizeUpokemon <= 1) {
    sizeUpokemon = 1;
  }
  if (sizeRivalpokemon <= 1) {
    sizeRivalpokemon = 1;
  }

  if (sizeUpokemon >= 3) {
    sizeUpokemon = 3;
  }
  if (sizeRivalpokemon >= 3) {
    sizeRivalpokemon = 3;
  }





  return (
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
        <div>uPokemon {state.battle.uPokemon.name}: {state.battle.uPokemon.hp - state.battle.uPokemon.actualHealdToCero}</div>
        <div>rivalPokemon {state.battle.rivalPokemon.name}: {state.battle.rivalPokemon.hp - state.battle.rivalPokemon.actualHealdToCero}</div>
      </div>
    </div >
  );
}

export default BattleField;
