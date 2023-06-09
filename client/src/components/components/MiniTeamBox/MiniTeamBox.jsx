import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { update } from '../../../redux/actions';

//!components
import Card from '../Card/Card';
import Separator from '../separator/Separator';
import IconPokeballs from '../../Icons/IconPokeballs';

function MiniTeamBox({ changeUpdate, stateUpdate }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.you.user);
    const release = useSelector(state => state.app.release);
    //console.log("MINI-------TEAM",release)


    const [state, setState] = useState({
        team: [],
        update: 0,
    })



    useEffect(() => {
        const fetchData = async () => {
            try {
                fetch(`http://localhost:9000/api/pokemons/${user.email}/team`)
                    .then(response => response.json())
                    .then(data => {
                        setState({ ...state, team: data, update: Math.random() * Math.random() })
                        //console.log(data.length)
                    })


            } catch (error) {
                console.error(error);
            }
        };

        //console.log("email team", user.email)
        fetchData();
    }, [release, stateUpdate]);


    return (
        <div className='content-team'>
            <div className="box">
                <div className="title"> <IconPokeballs /> Team </div>
                <Separator />
                <div className="team">
                    {state.team.map((infoCard) => {
                        return <Card key={`team${infoCard._id}`} infoPokemon={infoCard} changeUpdate={changeUpdate} structure='miniCard' />
                    })}
                </div>
            </div>
            {/* 
            */}
        </div>
    );
}

export default MiniTeamBox;
