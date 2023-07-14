import React from 'react'

//! components
import ShowStack from '../ShowStack/ShowStack';
import ReleasePokemon from '../ReleasePokemon/ReleasePokemon';


import { variables, dataBaseImages } from '../../../assets/variables';

function faceB({ info, color, release, cancel, trade, changeRelease }) {

    let imagePokemon = dataBaseImages.sprites.front_default(info?.noPokedex)

    if (info.shiny) {
        imagePokemon = dataBaseImages.sprites.front_shiny(info.noPokedex);
    }


    return (
        <div className='content-face-b'>

            <div className="name-b" style={{ color: `${color}` }} >{info.name}</div>

            <img src={imagePokemon} alt={`sprite-pokemon-${info.name}`} className="img-sprite" />

            <div className="stats-complete">
                <ShowStack infoPokemon={info} stack="HP" />
                <ShowStack infoPokemon={info} stack="ATK" />
                <ShowStack infoPokemon={info} stack="DFS" />
                <ShowStack infoPokemon={info} stack="ATK+" />
                <ShowStack infoPokemon={info} stack="DFS+" />
                <ShowStack infoPokemon={info} stack="SPD" />
            </div>


            {(trade[0] === 0 || trade[1] === 0) && (
                <div className="release"
                    onClick={changeRelease}
                >
                    releaseD
                </div>
            )}

            {(trade[0] !== 0 || trade[1] !== 0) && (<ReleasePokemon release={release} cancel={cancel} pokemon={info} trade={trade} />)}
        </div>
    )
}

export default faceB