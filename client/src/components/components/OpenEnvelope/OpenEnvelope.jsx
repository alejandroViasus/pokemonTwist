import React from 'react'
import { variables, functions } from '../../../assets/variables'
function OpenEnvelope(noPokedex) {
   const NoPokedex=functions.getNoPokedex(noPokedex);
   console.log(`se esta creando la card ${noPokedex}`);
  return (
    <div>CreatePokemon {NoPokedex} A</div>
  )
}

export default OpenEnvelope