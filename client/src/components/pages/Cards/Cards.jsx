import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { variables, functions } from '../../../assets/variables';

//!Components

import NavMenu from '../../components/NavMenu/NavMenu';
import Card from "../../components/Card/Card";
import FiltersBox from '../../components/FiltersBox/FiltersBox';
import Filter from '../../components/Filters/Filter';
import { update } from '../../../redux/actions';




function Cards() {
    const params = useParams();
    const navigate = useNavigate();
    const userState = useSelector(state => state.user);
    const initialState = useSelector(state => state.cards);
    const filters=useSelector(state=>state.filtersList)
    const release=useSelector(state=>state.app.release);
    //console.log(release,"RElease")

    const [state, setState] = useState({ 
        cards:initialState,
        filters:{},
        windows:{release:false},
        update:0
    });
    //console.log(state)

    const changeUpdate=()=>{
        const update=Math.random()+Math.random();
        console.log(update);
        setState({...state,update:update});
    }

    useEffect(() => {
        //console.log("assigned User", userState, userState.email);
        //fetch(`http://localhost:9000/api/pokemon/allnew?email=${userState.email}`)
        fetch(`http://localhost:9000/api/pokemon?email=${userState.email}`)
            .then(response => response.json())
            .then(data => {
                console.log("Data received:", data);

                const filtersCards=functions.filtersCards(data,filters);

                setState({
                    ...state,cards:filtersCards
                });
            })
            .catch(error => {
                console.error("Error:", error);
               
            });
    }, [userState,initialState,filters,release,state.update]);

    useEffect(()=>{
        console.log(state)
    },[state.cards])
    
    useEffect(()=>{
        if(release!==undefined && release!==0 && release!==""){
            //console.log(`switch ${release}`)
            setState({...state,windows:{...state.windows,release:true}})
        }
    },[release])
    
    useEffect(() => {
        if (params.gametag !== userState.gametag) {
            console.log("usuario undefined");
            navigate(`/`, { replace: true });
        }
    }, [params]);


    return (
        <div>

            {(release!==0) && (<div className="release">RELEASE !!!! </div>)}

            <NavMenu />

            <div className="body-cards">

                <div className="filters">
                    <div className="filterBox">
                    <FiltersBox />
                    </div>
                
               -------------------------------F 
                <Filter/>
               -------------------------------F 
              

                </div>
                <div className="cards">
                    {
                        state.cards.map(
                            (infoCard) => {
                                //console.log(infoCard)
                                return <div className="statement-card" key={infoCard._id}>
                                    <Card infoPokemon={infoCard} changeUpdate={changeUpdate}/>
                                </div>
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Cards