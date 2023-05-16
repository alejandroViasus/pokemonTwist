import React, { useEffect, useState } from 'react'

//libraries
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { login } from "../../../redux/actions";

//components
import LogOutButton from '../ButtonsLogin/LogOutButton';
import LoginButton from '../ButtonsLogin/LogInbutton';
//import IconCards from '../Icons/IconCards';
//import IconExp from '../Icons/IconExp';
//import IconPokeballs from '../Icons/IconPokeball';
//import AddPokemon from '../AddPokemon/AddPokemon'


function Navbar() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const dispatch = useDispatch();
    
    const userState = useSelector((state) => state);
    const userGametag = useSelector((state) => state.user.gametag);
    const userExpreience = useSelector((state) => state.user.experience);
    const userPicture = useSelector((state) => state.user.pictureTrainer);
    const userPokeballs = useSelector((state) => state.user.pokeballs);
    const userTickets = useSelector((state) => state.user.tickets);
    const userLeague = useSelector((state) => state.user.league);

    console.log( "nickname: ",userState)

    const [state, setState] = useState({
        name: "invitado",
        exp: 0,
        picture: "default",
        userPokeballs: 0,
        login: false,
        filterByName: "",
    })

    useEffect(() => {
        //console.log("user", user)
        //console.log("state", state)
        setState(
            {
                ...state,
                name: userGametag,
                exp: userExpreience,
                picture: userPicture,
                pokeballs: userPokeballs,
            })
    }
        , [userGametag]);

    if (isAuthenticated && !state.login) {
        console.log("USER !!!",user)
        dispatch(login(user.email, user.nickname, user.picture));
        //dispatch(getPokemons(user.email))
        setState({ ...state, login: true })

    }

    if (isLoading) return <h1>...Loading</h1>

    // const onChange = (e) => {
    //     //console.log(e.target.value)
    //     dispatch(filterByName(e.target.value));
    // }


    return (
        <div className='content-nav'>
            <div className="info">
                <div className="user-principal">
                    <div className='user-name'>{userGametag}</div>
                    <div className='user-progress'>
                        {/* 
                        <div className="user-detail"><IconCards /> 0</div>
                        <div className='user-detail'><IconPokeballs /> {state.pokeballs}</div>
                        <div className='user-detail'><IconExp /> {state.exp}</div> 
                        <AddPokemon />
                        */}
                    </div>
                </div>


                
                {isAuthenticated ? <LogOutButton /> : <LoginButton />}


                <div className="user-picture">
                    <img className='picture' src={state.picture} alt="" />
                </div>


            </div>
        </div>
    )
}

export default Navbar