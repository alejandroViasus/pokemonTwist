import React from 'react'

//! components
import ShowStack from '../ShowStack/ShowStack';


import { variables,dataBaseImages } from '../../../assets/variables';

function faceB({ info,color }) {

    let imagePokemon = dataBaseImages.sprites.front_default(info?.noPokedex)

    if (info.shiny) {
        imagePokemon = dataBaseImages.sprites.front_shiny(info.noPokedex);
    }


    return (
        <div className='content-face-b'>
            <div className="name-b" style={{color: `${color}`}} >{info.name}</div>
            <img src={imagePokemon} alt={`sprite-pokemon-${info.name}`} className="img-sprite" />


            <div className="stats-complete">
              <ShowStack infoPokemon={info} stack="HP" />
              <ShowStack infoPokemon={info} stack="ATK" />
              <ShowStack infoPokemon={info} stack="DFS" />
              <ShowStack infoPokemon={info} stack="ATK+" />
              <ShowStack infoPokemon={info} stack="DFS+" />
              <ShowStack infoPokemon={info} stack="SPD" />
            </div>

        </div>
    )
}

export default faceB