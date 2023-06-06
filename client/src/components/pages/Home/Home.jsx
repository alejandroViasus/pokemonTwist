import React from 'react'
import { infoCardsSprites } from '../../../assets/info'

import bgImage from "../../../assets/images/backGround/BackGroundInit.png"
import logoImage from "../../../assets/images/backGround/logoPokemonTwist.png"
import skyLarge from "../../../assets/images/stetics/sky/skyLarge.png"
import sky1 from "../../../assets/images/stetics/sky/sky1.png"
import sky2 from "../../../assets/images/stetics/sky/sky2.png"
import bgSkys from "../../../assets/images/stetics/sky/bgSkys.png"


//!components
import Nav from '../../components/Nav/Nav'
import InfoCard from '../../components/InfoCard/InfoCard'


function Home() {
  return (
    <div className='content-home'>

      <div className="boddy-home-image"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="boddy-home">
        <div className="image-logo">
          <img src={logoImage} alt="image-Logo-PokemonTwist" />
        </div>


        <div className="options-home">
          <div className="button-init">
            <Nav />
          </div>
          <div className="button-init">
            How to play
          </div>
          <div className="button-init">
            About
          </div>
        </div>

        <div className="sky">
          <div className="bgSkys">
            <img src={bgSkys} alt="image-Logo-PokemonTwist"
              style={{ animation: "skyHorizontal 15s infinite", position: "absolute" }}
            />
          </div>
          <div className="sky1">
            <img id='sky1' src={sky1} alt="image-Logo-PokemonTwist" style={{ animation: "skyHorizontal 15s infinite", position: "relative" }} />
          </div>
          <div className="sky2">
            <img id='sky2' src={sky2} alt="image-Logo-PokemonTwist" style={{ animation: "skyHorizontal 35s infinite", position: "relative" }} />
          </div>
        </div>
        <div className="sky-principal">
          <img id='skyPrincipal1' src={skyLarge} alt="image-Logo-PokemonTwist" style={{ animation: "fadeScaleHorizontal 40s infinite" }} />
          <img id='skyPrincipal2' src={skyLarge} alt="image-Logo-PokemonTwist" style={{ animation: "fadeScale 25s infinite" }} />
        </div>



        <div className="info">
          {infoCardsSprites.map((info, index) => {
            return <InfoCard key={`info${index}${info.pokemon}`} info={info} index={index} />
          })}
        </div>

        <div className="options-home">
          <div className=" button-init space">
            inicio
          </div>
        </div>


      </div>
    </div>
  )
}
export default Home