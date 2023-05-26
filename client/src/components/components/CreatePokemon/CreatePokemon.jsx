import React from 'react'
import { variables, functions } from '../../../assets/variables'
function CreatePokemon({noPokedex}) {
    functions.getNoPokedex(noPokedex);
  return (
    <div>CreatePokemon {noPokedex}</div>
  )
}

export default CreatePokemon