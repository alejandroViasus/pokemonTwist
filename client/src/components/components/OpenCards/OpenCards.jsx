import React, { useEffect, useState } from 'react'
import { variables } from '../../../assets/variables'
import CreatePokemon from '../CreatePokemon/CreatePokemon'
import OpenEnvelope from '../OpenEnvelope/OpenEnvelope'
import CloseEnvelope from '../OpenEnvelope/CloseEnvelope'

function OpenCards({ openOtherBox }) {
  const [cardStates, setCardStates] = useState([]); // Arreglo de estados de las cartas

  useEffect(() => {
    const initialState = pokedexNumbers.map(() => false);
    setCardStates(initialState);
  }, []);

  const noPokedex = () => {
    return Math.round((Math.random() * variables.sizePokedex[1]) + variables.sizePokedex[0])
  }

  const onClick = (index) => {
    const updatedStates = [...cardStates];
    updatedStates[index] = true;
    setCardStates(updatedStates);
  }

  const pokedexNumbers = [noPokedex(), noPokedex(), noPokedex()];

  return (
    <div>
      {
        pokedexNumbers.map((card, index) => {
            console.log(card)
          return (
            <div key={`card-${index}-${card}`}>
              <div className="envelope" onClick={() => onClick(index)}>
                {!cardStates[index] && <CloseEnvelope />}
                {cardStates[index] && <OpenEnvelope noPokedex={card[index]} />}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default OpenCards


// import React, { useEffect } from 'react'
// import { variables } from '../../../assets/variables'
// import { useState } from 'react'

// //!components
// import CreatePokemon from '../CreatePokemon/CreatePokemon'
// import OpenEnvelope from '../OpenEnvelope/OpenEnvelope'
// import CloseEnvelope from '../OpenEnvelope/CloseEnvelope'
// function OpenCards({ openOtherBox }) {
    
//     const [state,setState]=useState(false)

//     useEffect(()=>{},[state])
    
//     const noPokedex = () => {
//         return Math.round((Math.random() * variables.sizePokedex[1]) + variables.sizePokedex[0])
//     }

//     const onClick = () => {
//         setState(true)
//     }

//     const pokedexNumbers = [noPokedex(), noPokedex(), noPokedex()]

//     console.log(pokedexNumbers);
//     return (
//         <div>
//             {
//                 pokedexNumbers.map((card, index) => {
//                     console.log(card)
//                     return <div key={`card-${index}-${card}`} id={`index${index}`}>
//                         <div className="envelope" onClick={onClick}> 
//                             {!state && <CloseEnvelope />}
//                             {state && <OpenEnvelope noPokedex={card} />}
//                         </div>

//                     </div>
//                 })
//             }
//         </div>
//     )
// }

// export default OpenCards