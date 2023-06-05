import React from 'react'
import { dataBaseImages } from '../../../assets/variables'

function PokemonInBattle({role,pokemon}) {
   // console.log(role,pokemon)
    let noPokedex=pokemon?.noPokedex||1;

  return (
    <div style={{height:"100%",width:"auto"}}>
        <img id={`${role}PokemonImg`} src={dataBaseImages.official.default(noPokedex)} alt="" style={{height:"90%",width:"auto"}} />
    </div>
  )
}

export default PokemonInBattle