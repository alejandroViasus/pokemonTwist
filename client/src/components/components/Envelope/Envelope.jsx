import React from 'react'
import { dataBaseImages } from '../../../assets/variables';
import { useEffect } from 'react';

function Envelope({ card, user, select, stateSelect }) {

  //console.log("card:", card)

  let containerClass = 'container-enveloped';
  if (card.show === 'open') {
    containerClass += ' enveloped-selected';
  }
  //const image=dataBaseImages.dreamWorld.default||dataBaseImages.official.default
  let image = dataBaseImages.official.default
  if (card.shiny) {
    image = dataBaseImages.official.shiny;
  }


  return (
    <div className={`container-enveloped ${card.show === "open" ? "enveloped-selected" : ""}`} onClick={() => select(card.key)}>

      {(!stateSelect) && (
        <div className="close-cards">
          Box
        </div>
      )}
      {(stateSelect) && (
        <div className="open-cards">
          {`${card.key}: ${card.show} ${card.noPokedex} ${card.levelPokemon}`}
          <img src={image(card.noPokedex)} alt="" />
        </div>
      )}
    </div>
  )
}

export default Envelope