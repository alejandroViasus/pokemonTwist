
import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { variables, functions } from '../../../assets/variables';
import { update } from '../../../redux/actions';

//!Components
import NavMenu from '../../components/NavMenu/NavMenu';
import Card from "../../components/Card/Card";
import FiltersBox from '../../components/FiltersBox/FiltersBox';
import Filter from '../../components/Filters/Filter';
import MiniTeamBox from '../../components/MiniTeamBox/MiniTeamBox';
import SelectorPages from '../../components/SelectorPages/SelectorPages';
import Perfil from '../../components/Perfil/Perfil';

function Cards() {
    const params = useParams();
    const navigate = useNavigate();
    const userState = useSelector(state => state.you.user);
    const initialState = useSelector(state => state.you.cards);
    const filters = useSelector(state => state.filtersList)
    const release = useSelector(state => state.app.release);

    //console.log(release, "RElease")

    const [state, setState] = useState({
        cards: [],
        showPokemons: [],
        filters: {},
        windows: { release: false },
        update: 0,
        index: 1,
        show: 8
    });

    useEffect(() => {
        if (params.gametag !== userState.gametag) {
            console.log("usuario indeterminado");
            navigate(`/`, { replace: true });
        }
    }, [params]);

    useEffect(() => {
        //console.log("assigned User", userState, userState.email);
        //fetch(`http://localhost:9000/api/pokemon/allnew?email=${userState.email}`)
        fetch(`http://localhost:9000/api/pokemon?email=${userState.email}`)
            .then(response => response.json())
            .then(data => {

                const filtersCards = functions.filtersCards(data, filters);

                setState({
                    ...state, cards: filtersCards
                });
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, [userState, initialState, filters, release, state.update]);

    useEffect(() => {
        if (release !== undefined && release !== 0 && release !== "") {
            //console.log(`switch ${release}`)
            setState({ ...state, windows: { ...state.windows, release: true } })
        }
    }, [release])



    const changeUpdate = () => {
        const update = Math.random() + Math.random();
        //console.log(update);
        setState({ ...state, update: update });
    }

    const changePage = (newIndex) => {
        let index = newIndex;
        if (index <= 1) { index = 1 }
        if (index > (Math.ceil(state.cards.length / state.show))) { index = index - 1 }
        console.log(index)
        setState({ ...state, index: index });
    }


    useEffect(() => {
        const show = [];
        let iterator = state.index * state.show;

        for (let i = iterator - state.show; i < iterator; i++) {
            if (state.cards !== undefined) {
                show.push(state.cards[i])
            } else {
                show.push("empty")
            }
        }
        setState({ ...state, showPokemons: show })
    }, [state.cards, state.index])


    return (
        <div className='content-cards'>
            <div className="nav">
                <NavMenu />
            </div>
            <div className="boddy">
                <div className="content-boddy perfil">
                    <div className="perfil-user">
                        <Perfil />
                    </div>
                    <div className="team-user">
                        <MiniTeamBox changeUpdate={changeUpdate} stateUpdate={state.update} />
                    </div>
                </div>
                <div className="content-boddy cards">
                    <div className="place-cards">


                        {
                            state.showPokemons?.map(
                                (infoCard, index) => {
                                    if (infoCard !== undefined && infoCard !== `empty`) {
                                        return <Card key={infoCard._id} infoPokemon={infoCard} changeUpdate={changeUpdate} />
                                        
                                            return <div className="statemet-card" key={`infoCard${index}`}>empty</div>
                                    } else {
                                        return <div className="statemet-card" key={`infoCard${index}`}>empty</div>
                                    }
                                }
                            )
                        }
                    </div>
                    {/*
                            */}
                    <div className="place-selector-page">
                        <SelectorPages state={state} changePage={changePage} />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Cards


{/*


 {(release !== 0) && (<div className="release">RELEASE !!!! </div>)}


            <div className="body-cards">

                <div className="filters">
                    <div className="filterBox">
                        <FiltersBox />
                    </div>

                    -------------------------------F
                    <Filter />
                    -------------------------------F
                </div>

                <div className="selectorPage">
                    <SelectorPages state={state} changePage={changePage} />
                </div>
                

                <div className="selectorPage">
                  
                </div>



                <div className="place-mini-team">
                   
                </div>



            </div>


    */}