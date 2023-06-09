import React from 'react'
import { useSelector } from 'react-redux'
import { dataBaseImages, variables } from '../../../assets/variables'


//! components
import IconExp from '../../Icons/IconExp.jsx'
import IconTickets from '../../Icons/iconTickets'
import IconPokeballs from '../../Icons/IconPokeballs'
import Separator from '../separator/Separator'

function Perfil() {

  const user = useSelector(state => state.you.user)
  console.log(user)
  console.log(user.pictureTrainer, variables.imagesTrainers[user.pictureTrainer][0])

  return (
    <div className='content-perfil'>

      <div className="user-gametag">
        <div className="gametag">
          {user.gametag}
        </div>
      </div>
      <Separator />
      <div className="user-level">{user.level}00</div>
      <div className="user-perfil">
        <div className="user-economy">
          <div className="trade-element"> <IconPokeballs /> {user.pokeballs} </div>
          <div className="trade-element"> <IconTickets /> {user.tickets} </div>
          <div className="trade-element"> <IconExp /> {user.coins} </div>
        </div>
        <div className="user-image-trainer">
          <img className='image-trainer' src={`${variables.imagesTrainers[user.pictureTrainer][0]}`} alt="" />

        </div>
      </div>
    </div>
  )
}

export default Perfil

{/* 

      <div className="user-experience">{user.experience}</div>
      <div className="user-fractionLevel">{user.fractionLevel}</div>
      <div className="user-pokeballs">{user.pokeballs}</div>
      <div className="user-tickets">{user.tickets}</div>

*/}
