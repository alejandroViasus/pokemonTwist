import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { initialUser, dispatchState } from '../../../redux/actions';
import { functions, variables } from '../../../assets/variables';

//!components
import NavMenu from '../../components/NavMenu/NavMenu';
import NavBar from '../../components/NavBar/NavBar';

function HomeLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gametag } = useParams();
  const globalState = useSelector(state => state);

  const [state, setState] = useState(variables.initialState.state)

  useEffect(() => {

    //if (globalState.you.user.gametag!=="invitado") {
      const rival = {
        ...globalState.you.user,
        email: `rival_${globalState.you.user.email}`,
        gametag: "Trainer Rival",
        level: Math.ceil(Math.random() * (1 + globalState.you.user.level)) * (globalState.you.user.level + 12),
        pictureTrainer: Math.round(Math.random() * variables.imagesTrainers.length)
      }

      const rarityUser = functions.getRarity(globalState.you.user);
      const rarityRival = functions.getRarity(rival);

      // setState({ ...state, rival: { ...state.rival, user: rival, rarity: rarityRival }, you: { ...state.you, user: userState, team: { ...state.you.team, pokemons: data }, rarity: rarityUser } })

      console.log(state);
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
              rarity:rarityRival,
              ...prevState.rival,
              user: rival,
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


    //}
  }, [globalState]);




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

    if (state.rival.team.pokemons.length < 5) {
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
            basePokemon.genre,
            i
          );
          pokemons.push(pokemon);
        }

        //const pokemonSelected = pokemons[Math.floor(Math.random() * pokemons.length - 1)]
        const indexSelectorPokemon = Math.round(Math.random() * (pokemons.length - 1))
        const pokemonSelected = pokemons[indexSelectorPokemon]
        //console.log("pokemonSelected",indexSelectorPokemon,pokemons.length-1, pokemonSelected);
        const pokemonUserSelected = state.you.team?.pokemons[0]
        setState({ ...state, you: { ...state.you, team: { ...state.you.team, selected: pokemonUserSelected } }, rival: { ...state.rival, team: { ...state.rival.team, pokemons, selected: pokemonSelected } } })
      };
      fetchPokemonData();
    }

  }, [state.rival.team.basePokemon,]);


  useEffect(() => {


    console.log("EstadoModificado");
    console.log('Valor de gametag:', gametag);
    fetch(`http://localhost:9000/api/users/gametag/${gametag}`)
      .then((response) => response.json())
      .then((data) => {
        if (globalState.rival.team.pokemons.length < 5) { dispatch(dispatchState(state)) }
        dispatch(initialUser(data));
      })
      .catch((error) => {
        console.log('Error al obtener los datos:', error);
        navigate(`/`, { replace: true });
      });
    // [dispatch, gametag, userState.box]
  }, [state.rival.team.selected]);

  return (
    <div>
      <div className="place-menu-nav">
        <NavMenu />
      </div>

      <div className="body-login-home">
        <div className="place-NavBar">
          <NavBar />
        </div>
      </div>
    </div>
  );
}

export default HomeLogin;




//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// function HomeLogin() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { gametag } = useParams();
//   const userState = useSelector(state => state);

//   useEffect(() => {
//     console.log("EstadoModificado");
//     console.log('Valor de gametag:', gametag);
//     fetch(`http://localhost:9000/api/users/gametag/${gametag}`)
//       .then((response) => response.json())
//       .then((data) => {
//         dispatch(initialUser(data));
//       })
//       .catch((error) => {
//         console.log('Error al obtener los datos:', error);
//         navigate(`/`, { replace: true });
//       });
//   }, [dispatch, gametag, userState.box]);

//   // useEffect(() => {
//   //   if (gametag !== userState.gametag) {
//   //     console.log("usuario indeterminado");
//   //     navigate(`/`, { replace: true });
//   //   }
//   // }, [userState]);

//   return (
//     <div>
//       <div className="place-menu-nav">
//         <NavMenu />
//       </div>

//       <div className="body-login-home">
//         <div className="place-NavBar">
//           <NavBar />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomeLogin;
