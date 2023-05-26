import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { variables } from '../../../assets/variables';

//!components
import LogOutButton from '../ButtonsLogin/LogOutButton';

function NavBar() {
    const userState=useSelector((state=>state.user));
    useEffect(()=>{

    },[userState]);

  return (
    <div>
        NavBar {userState.email}
        <div className="NavBar-gametag">{userState.gametag}</div>
        <div className="NavBar-tickets">{userState.tickets}</div>
        <div className="NavBar-pokeball">{userState.pokeballs}</div>
        <div className="NavBar-box">{userState.box}</div>
        <div className="NavBar-level">{userState.level}</div>
        <div className="NavBar-league">{userState.league}</div>
        <div className="NavBar-img">
            <img src={`${variables.imagesTrainers[userState.pictureTrainer]}`} alt={`image user ${userState.gametag}`} style={{height:"150px", width:"auto"}}/>
        </div>
        <LogOutButton/>

    </div>
  )
}

export default NavBar