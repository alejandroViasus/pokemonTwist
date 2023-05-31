import React from 'react'
import { dataBaseImages } from '../../../assets/variables'

function PokemonInBattle({role,pokemon}) {
    //console.log(role,pokemon)
    let noPokedex=pokemon.noPokedex||1;

  return (
    <div>
        <img src={dataBaseImages.sprites.front_default(noPokedex)} alt="" style={{height:"5vw",width:"auto"}} />
    </div>
  )
}

export default PokemonInBattle