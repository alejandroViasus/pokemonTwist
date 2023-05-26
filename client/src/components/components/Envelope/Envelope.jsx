import React from 'react'
import { dataBaseImages } from '../../../assets/variables';

function Envelope({card,user,select}) {

    let containerClass = 'container-enveloped';
    if (card.show === 'open') {
      containerClass += ' enveloped-selected';
    }
    //const image=dataBaseImages.dreamWorld.default||dataBaseImages.official.default
    let image=dataBaseImages.official.default
    if(card.shiny){
        image=dataBaseImages.official.shiny;
    }
    

  return (
    <div  className={`container-enveloped ${card.show === "open" ? "enveloped-selected" : ""}`} onClick={() => select(card.key)}>

        {`${card.key}: ${card.show} ${card.noPokedex} ${card.levelPokemon}`}
        <img src={image(card.noPokedex)} alt="" />
    </div>
  )
}

export default Envelope