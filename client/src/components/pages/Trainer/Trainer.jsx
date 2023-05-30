import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { functions, variables } from '../../../assets/variables';

//!components
import Card from '../../components/Card/Card';
import NavMenu from '../../components/NavMenu/NavMenu';

function Trainer() {
  const disPatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const userState = useSelector(state => state.user);

  const [state, setState] = useState({
    you: {
      user: {},
      team: {
        pokemons: [],
        selected: {}
      },
    },
    rival: {
      user: {},
      team: {
        basePokemon: [],
        dataPokemon: [],
        pokemons: [],
        selected: {}
      },
    },
    battle: {
      seed: 0,
      phaseSelections: true

    }

  })

  useEffect(() => {
    if (params.gametag !== userState.gametag) {
      console.log("usuario indeterminado");
      navigate(`/`, { replace: true });
    }
    console.log(`userState.gametag`, userState.gametag)
  }, [params]);

  useEffect(() => {
    if (userState.gametag) {
      try {
        const email = userState.email
        fetch(`http://localhost:9000/api/pokemons/${email}/team`)
          .then(response => response.json())
          .then(data => {
            const rival = {
              ...userState,
              email: `rival_${userState.email}`,
              gametag: "Trainer Rival",
              level: Math.ceil(Math.random() * (1 + userState.level)) * (userState.level + 12),
              pictureTrainer: Math.round(Math.random() * variables.imagesTrainers.length)
            }

            const rarityUser = functions.getRarity(userState);
            const rarityRival = functions.getRarity(rival);

            setState({ ...state, rival: { ...state.rival, user: rival, rarity: rarityRival }, you: { ...state.you, user: userState, team: { ...state.you.team, pokemons: data }, rarity: rarityUser } })
          })
      } catch (error) {
        console.log(error);
      }
    }
  }, [userState, state.battle.seed]);

  useEffect(() => {
    const posiblesPokemons = [
      functions.getNoPokedex(),
      functions.getNoPokedex(),
      functions.getNoPokedex(),
      functions.getNoPokedex(),
      functions.getNoPokedex(),
      functions.getNoPokedex(),
    ];

    const fetchPokemonData = async () => {
      try {
        const responses = await Promise.all(posiblesPokemons.map(pokemon => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)));
        const pokemonData = await Promise.all(responses.map(response => response.json()));

        setState(prevState => ({
          ...prevState,
          rival: {
            ...prevState.rival,
            team: {
              ...prevState.rival.team,
              dataPokemon: pokemonData,
            },
          },
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemonData();
  }, [state.you.user, state.battle.seed]);

  useEffect(() => {
    const basePokemon = [];

    state.rival.team.dataPokemon?.map((pokemon) => {
      const base = {
        levelPokemon: functions.getLevelPokemon(state.rival.user),
        noPokedex: pokemon.id,
        shiny: functions.getShiny(),
        genre: functions.getGenre(),
      }
      basePokemon.push(base);
    })

    setState({ ...state, rival: { ...state.rival, team: { ...state.rival.team, basePokemon } } })
  }, [state.rival.team.dataPokemon]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const pokemons = [];

      for (let i = 0; i < state.rival.team.basePokemon.length - 1; i++) {
        const basePokemon = state.rival.team.basePokemon[i];
        const pokemon = await functions.getPokemon(
          state.rival.user,
          state.rival.team.dataPokemon[i],
          basePokemon.levelPokemon,
          state.rival.rarity,
          basePokemon.shiny,
          basePokemon.genre
        );
        pokemons.push(pokemon);
      }

      const pokemonSelected = pokemons[Math.floor(Math.random() * pokemons.length - 1)]
      console.log("pokemonSelected", pokemonSelected);

      const pokemonUserSelected = state.you.team?.pokemons[0]


      setState({ ...state, you: { ...state.you, team: { ...state.you.team, selected: pokemonUserSelected } }, rival: { ...state.rival, team: { ...state.rival.team, pokemons, selected: pokemonSelected } } })
    };

    fetchPokemonData();
  }, [state.rival.team.basePokemon,]);

  const reMatch = () => {
    setState({ ...state, battle: { ...state.battle, seed: Math.random() * 2 } })
  }

  const ready = () => {
    setState({ ...state, battle: { ...state.battle, phaseSelections: false } })
  }
  const selection = (e) => {
    const index = e.currentTarget.getAttribute("index");
    console.log(state.you.team.pokemons[index].name)
    setState({ ...state, you: { ...state.you, team: { ...state.you.team, selected: state.you.team.pokemons[index] } } })
  }

  return (
    <div className='container-trainer'>
      <NavMenu />
      {(state.battle.phaseSelections) && (
        <div className="selections-team">
          <div className="s">...........Selected.........userTeam</div>
          {(state.rival.team.selected?.noPokedex) && (
            <Card infoPokemon={state.rival.team.selected} structure='selectorCard' />
          )}
          <div className="s">..........Selected..........userTeam</div>
          <div className="s">....................RivalTeam</div>
          <div className="teamUser">
            {state.rival.team.pokemons?.map((infoCard) => {

              return (
                <div className={`pokemon ${state.rival.team.selected?.noPokedex===infoCard.noPokedex &&state.rival.team.selected?.level===infoCard.level ? "selected" : ""}`}>
                  <Card key={`selector-rival${infoCard.noPokedex}`} infoPokemon={infoCard} structure='selectorCard' />
                </div>
              )
            })}
          </div>
          <button onClick={reMatch}>re-Match</button>
          <div className="s">........................................................</div>
          <div className="s">...........Selected.........userTeam</div>
          {(state.you.team.selected?.noPokedex) && (
            <Card infoPokemon={state.you.team.selected} structure='selectorCard' />
          )}
          <div className="s">..........Selected..........userTeam</div>
          <div className="teamUser">
            {state.you.team.pokemons?.map((infoCard, index) => {
              return (
                <div className={`pokemon ${state.you.team.selected?._id === infoCard._id ? "selected" : ""}`} onClick={selection} index={index}>
                  <Card key={`selector${infoCard._id}`} infoPokemon={infoCard} structure='selectorCard' />
                </div>)
            })}
          </div>
          <button onClick={ready}> Ready !!</button>
        </div>

        // ! EMPEZAR EL COMBATE POKEMON 
      )}
    </div>
  )
}

export default Trainer