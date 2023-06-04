import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../../redux/actions';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { variables, functions } from '../../../assets/variables';

//!components
import NavMenu from '../../components/NavMenu/NavMenu';
import Envelope from '../../components/Envelope/Envelope';

function Box() {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.you.user);
    const navigate = useNavigate();
    const params = useParams();
    const posiblesPokemons = [];
    const initialState = {
        select: false,
        boosterPack: false,
        switch: true,
        rare: functions.getRarity(userState),
        selectCard: {
            card1: {
                key: "card1",
                levelPokemon: functions.getLevelPokemon(userState),
                noPokedex: functions.getNoPokedex(),
                show: "close",
                shiny: functions.getShiny(),
                genre: functions.getGenre(),
            },
            card2: {
                key: "card2",
                levelPokemon: functions.getLevelPokemon(userState),
                noPokedex: functions.getNoPokedex(),
                show: "close",
                shiny: functions.getShiny(),
                genre: functions.getGenre(),
            },
            card3: {
                key: "card3",
                levelPokemon: functions.getLevelPokemon(userState),
                noPokedex: functions.getNoPokedex(),
                show: "close",
                shiny: functions.getShiny(),
                genre: functions.getGenre(),

            },
            card4: {
                key: "card4",
                levelPokemon: functions.getLevelPokemon(userState),
                noPokedex: functions.getNoPokedex(),
                show: "close",
                shiny: functions.getShiny(),
                genre: functions.getGenre(),
            },
        }
    };

    const [state, setState] = useState(
        initialState
    );

    // useEffect(() => {
    //     return () => {
    //         // Código a ejecutar antes de desmontar el componente
    //         console.log('--------------------------------------El componente se está desmontando', state);
    //         if (state.boosterPack && !state.select) {
    //             console.log("CAJA ALEATORIA APLICADA", state)
    //         }
    //     };
    // }, [state.boosterPack, state.select]);

    useEffect(() => {
        if (params.gametag !== userState.gametag) {
            console.log("usuario indeterminado");
            navigate(`/`, { replace: true });
        }
    }, [params]);

    useEffect(() => {
        //este UseEffect lo uso para que se renderice nuevamente cuando cargue el estado del usuario
        //console.log("state Actual : ", state)
    }, [userState, posiblesPokemons, initialState])

    const openPack = () => {
        const newState = { ...userState, box: userState.box - 1 };
        fetch(`http://localhost:9000/api/users/${userState._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newState),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Response:', data);
                dispatch(update(data.response));



                Promise.all(
                    Object.keys(state.selectCard).map((card) => {
                        console.log('NOPOKEDEX', state.selectCard[card].noPokedex);
                        return fetch(
                            `https://pokeapi.co/api/v2/pokemon/${state.selectCard[card].noPokedex}`
                        )
                            .then((response) => response.json())
                            .then((data) => posiblesPokemons.push(data));
                    })
                )
                    .then(() => {
                        const newSelectCard = {};
                        const keys = Object.keys(state.selectCard);
                        // keys.forEach((key, index) => {
                        //   newSelectCard[key] = {
                        //     ...state.selectCard[key],
                        //     dataBase: posiblesPokemons[keys.length - index - 1],
                        //   };
                        // });

                        keys.map((key) => {
                            console.log("in KEY ", key, posiblesPokemons.length, state.selectCard[key].noPokedex)
                            const pokedexPokemonState = state.selectCard[key].noPokedex;
                            posiblesPokemons.map((dataBasePokemon) => {
                                //console.log(dataBasePokemon.id, pokedexPokemonState, dataBasePokemon.id === pokedexPokemonState)
                                if (dataBasePokemon.id === pokedexPokemonState) {
                                    newSelectCard[key] = {
                                        ...state.selectCard[key], dataBase: dataBasePokemon
                                    }
                                }
                            })
                        })

                        setState({
                            ...state,
                            boosterPack: true,
                            switch: false,
                            selectCard: newSelectCard,
                        });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };



    const confirm = () => {
        console.log("FINAL STATE BOX", state.selectCard);

        for (const key in state.selectCard) {
            //console.log(state.selectCard[key].show);
            if (state.selectCard[key].show === "open") {
                console.log("dispatch addPokemon", state.selectCard[key].dataBase.name, "´´´ç", state.selectCard[key].shiny,)


                functions.generatePokemon(
                    userState,
                    state.selectCard[key].dataBase,
                    state.selectCard[key].levelPokemon,
                    state.rare,
                    state.selectCard[key].shiny,
                    state.selectCard[key].genre,
                )

            }
        }


        return setState(initialState)

    }

    const select = (key) => {
        if (!state.select) {
            const allCards = Object.keys(state.selectCard);
            const newState = {
                ...state,
                select: true,
                selectCard: { ...state.selectCard, }
            };
            console.log(newState);
            allCards.forEach((card) => {
                if (key === newState.selectCard[card].key) {
                    newState.selectCard[card] = {
                        ...newState.selectCard[card], show: "open"
                    }
                    //functions.fetchPokemon(newState.selectCard[card].noPokedex)

                } else {
                    newState.selectCard[card] = {
                        ...newState.selectCard[card], show: "deprecate"
                    }
                }

                //console.log(
                //     key,
                //     key === state.selectCard[card].key,
                //     newState.selectCard[card]
                // );

            })
            //console.log(`---`, newState, `---`);


            return setState(newState)
        }
    }

    const missOperation = (redirect) => {
        // alert("desea salir sin seleccionar un alguna carta ")
        if (state.select) {
            confirm ();
            alert(`carta seleccionada almacenada con exito`);
            redirect();
        } else {
            const response = window.confirm(`A card will be chosen randomly `)
            if (response) {
                const sizeCards = Object.keys(state.selectCard)
                const numRandom = Math.round(Math.random() * sizeCards.length);
                const pokemon = state.selectCard[sizeCards[numRandom]];
                const generatePokemon = functions.generatePokemon;


                // //
                // functions.getPokemon(
                //     userState,
                //     state.selectCard[key].dataBase,
                //     state.selectCard[key].levelPokemon,
                //     state.rare,
                //     state.selectCard[key].shiny,
                //     state.selectCard[key].genre,
                // )
                // //

                generatePokemon(
                    userState,
                    pokemon.dataBase,
                    pokemon.levelPokemon,
                    state.rare,
                    pokemon.shiny,
                    pokemon.genre
                )


                console.log(sizeCards, numRandom);
                console.log(`Carta aleatoria ${state.selectCard[sizeCards[numRandom]].dataBase.name}`)

                redirect();
            }
        }
    }

    //console.log(userState.box)

    return (
        <div>
            <div className="place-menu-nav">
                <NavMenu switchMenu={state.switch} missOperation={missOperation} />
            </div>
            <div className="body-box">

                <div className="prueba" onClick={()=>{functions.getEvolution(1)}}>Prueba</div>
                <div className="pack">
                    {state.boosterPack && Object.keys(state.selectCard).map((card) => {
                        return <div className="card-pack" key={`${card}`}>
                            <Envelope
                                card={state.selectCard[card]}
                                user={userState}
                                select={select}
                                stateSelect={state.select}
                            />
                        </div>
                    })}
                </div>

                <div className="buttons-">
                    {!state.boosterPack && <div className="open-pack" onClick={openPack}>({`open Pack (${userState.box})`})</div>}
                    {state.boosterPack && <div className="open-pack" onClick={confirm}>(confirm)</div>}
                </div>box
            </div>
        </div>
    )
}

export default Box