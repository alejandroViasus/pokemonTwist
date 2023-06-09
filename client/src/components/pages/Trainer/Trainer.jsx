import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { functions, variables } from '../../../assets/variables';
import { battle } from '../../components/BatlleField/BattleFielt';
import { dispatchState } from '../../../redux/actions';
// //!components
import Card from '../../components/Card/Card';
import NavMenu from '../../components/NavMenu/NavMenu';
import BattleField from '../../components/BatlleField/BattleField';
import DisplayEndBattle from '../../components/DisplayEndBattle/DisplayEndBattle';


function Trainer() {

  const disPatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const globalState = useSelector(state => state);
    const userState = useSelector(state => state.you.user);

  const [state, setState] = useState(variables.initialState.state);

   useEffect(() => {
    if (params.gametag !== userState.gametag||globalState.rival.team.basePokemon.length<5) {
      console.log("usuario indeterminado");
      navigate(`/`, { replace: true });
    }
    //console.log(`userState.gametag`, userState.gametag)
  }, [params]);

  

  useEffect(() => {
        if (userState.gametag) {
          try {
            const email = userState.email
            fetch(`http://localhost:9000/api/pokemons/${email}/team`)
              .then(response => response.json())
              .then(data => {
    
                if (data.length > 0) {
                  const rarityUser = functions.getRarity(userState); 
                  
                  data.map((pokemon,i)=>{
                    pokemon.indexPokemon=i
                  })

                  console.log("USERpOKEMON: ", data);

                  const newState={ ...globalState,
                    battle:{...globalState.battle,
                      phaseSelections:true,
                    }, 
                    you: { ...globalState.you,rarity:rarityUser,
                      team: { ...globalState.you.team, pokemons: data,selected:data[0] 
                      }
                    }
                   }

                  setState(newState)
                  disPatch(dispatchState(newState))
                } else {
                  alert("UPS!!! ,no posees en este momento un equipo Pokemon");
                  navigate(`/`, { replace: true });
                }
    
              })
          } catch (error) {
            console.log(error);
          }
        }
      }, [userState, state.battle.seed,state.battle.finalBattle]);

      useEffect(()=>{
        console.log("__ABISMAL", globalState)
        if(globalState?.battle.finalBattle){
          setState(globalState)
        };
      },[globalState])

  

   const reMatch = () => {
    //setState({ ...state, battle: { ...state.battle, seed: Math.random() * 2 } })
    const newState={...state}
    let index=Math.round(Math.random()*(newState.rival.team.pokemons.length-1))
    if(index<=0){
      index=0;
    }
    if(newState.rival.team.pokemons[index].heald===100){
      newState.rival.team.selected=newState.rival.team.pokemons[index]
      setState(newState)
    }else{
      reMatch()
    }
  }

  const ready = () => {
    if(state.you.team.selected.heald===100&&state.rival.team.selected.heald===100){
      const toGlobalState={...state,battle:{...state.battle,phaseSelections:false}}
      console.log("Ok",toGlobalState);
      setState(toGlobalState);
      disPatch(dispatchState(toGlobalState))
    }else if(state.rival.team.selected.heald!==100){
      reMatch()
    }else{
      alert("tu pokemon ha sido ha sido inabilitado")
    }
  }

  const selection = (e) => {
    const index = e.currentTarget.getAttribute("index");
    //console.log(state.you.team.pokemons[index].name)
    if(state.you.team.pokemons[index].heald===100){
      setState({ ...state, you: { ...state.you, team: { ...state.you.team, selected: state.you.team.pokemons[index] } } })
    }
  }

  const missOperation = (redirect) => {
    // alert("desea salir sin seleccionar un alguna carta ")
    if (!state.switch) {
      const response = window.confirm(`End battle`)
      if (response) {
        redirect();
      }
    }
  }

  const goToBack=()=>{
    navigate(`/`, { replace: true });
  }
  const again= async(selection="")=>{
    const newState= await functions.otherRival(globalState)
    newState.you.team.pokemons.map((pokemon)=>{
      pokemon.heald=100;
    })
    newState.battle.loseBattle="";
    newState.battle.phaseSelections=true;
    newState.battle.finalBattle=false;
    console.log("AGAIN new State",newState);
    disPatch(dispatchState(newState));
    if(selection==="change-team"){
      navigate(`/${params.gametag}/cards`, { replace: true });
    }
    if(selection==="go-to-home"){
      navigate(`/`, { replace: true });
    }
  }

  

//! Falta hacer un chace Pokemon en medio de la partida y tambien llevar un contador de salud Actual de cda pokemon

 return (
       <div className='container-trainer'>
         <NavMenu switchMenu={state.switch} missOperation={missOperation} />
         {(state.battle.finalBattle)&&(<div>
          <DisplayEndBattle again={again}/>
          </div>)}
         {(state.battle.phaseSelections&&!state.battle.finalBattle) && (
           <div className="selections-team">
             <button onClick={goToBack}>BACK HOME</button>


             <div className="s">...........Selected.........userTeam</div>
             {(state.rival.team.selected?.noPokedex) && (
               <Card infoPokemon={state.rival.team.selected} structure='selectorCard' />
             )}
             <div className="s">..........Selected..........userTeam</div>
             <div className="s">....................RivalTeam</div>
             <div className="teamUser" style={{display:"flex"}}>
               {state.rival.team.pokemons?.map((infoCard, index) => {
                 let opacity = "1";
                 if (infoCard.heald === 0) {
                   opacity = "0.5";
                 }
                 return (
  
                   <div key={`selector-rival${infoCard.noPokedex}${infoCard.scale}`} className={`pokemon ${state.rival.team.selected?.noPokedex === infoCard.noPokedex && state.rival.team.selected?.level === infoCard.level ? "selected" : ""}`}
                     style={{ opacity }}
                   >
                     <Card key={`selector-rival-card${infoCard.noPokedex}`} infoPokemon={infoCard} structure='selectorCard' />
                   </div>
                 )
                 //)
               })}
             </div>
  
             <button onClick={reMatch}>re-Match</button>
             <div className="s">........................................................</div>
             <div className="s">...........Selected.........userTeam</div>
             {(state.you.team.selected?.noPokedex) && (
               <Card infoPokemon={state.you.team.selected} structure='selectorCard' />
             )}
             <div className="s">..........Selected..........userTeam</div>
             <div className="teamUser" style={{display:"flex"}}>
               {state.you.team.pokemons?.map((infoCard, index) => {
                 let opacity = "1";
                 if (infoCard.heald === 0) {
                   opacity = "0.5";
                 }
                 return (
                   <div key={`selector${infoCard.noPokedex}${infoCard.scale}`} className={`pokemon ${state.you.team.selected?._id === infoCard._id ? "selected" : ""}`} onClick={selection} index={index}
                     style={{ opacity }}
                   >
                     <Card key={`selector-card${infoCard._id}`} infoPokemon={infoCard} structure='selectorCard' />
                   </div>)
  
               })}
             </div>
             <button onClick={ready}> Ready !!</button>
           </div>
  
           // ! EMPEZAR EL COMBATE POKEMON 
         )}
           {(!state.battle.phaseSelections&&!state.battle.finalBattle) && (
           <div className="place-stadium">
             <BattleField lstate={state} ready={ready}/>
           </div>
         )}
       </div>
     )
   }


export default Trainer







// function Trainer() {


//   const [state, setState] = useState({
//     switch: true,
//     you: {
//       user: {},
//       team: {
//         pokemons: [],
//         selected: {}
//       },
//     },
//     rival: {
//       user: {},
//       team: {
//         basePokemon: [],
//         dataPokemon: [],
//         pokemons: [],
//         selected: {}
//       },
//     },
//     battle: {
//       seed: 0,
//       timmer: 5,
//       phaseSelections: true,
//     }

//   })



//  

//   useEffect(() => {

    
    
//     const posiblesPokemons = [
//       functions.getNoPokedex(),
//       functions.getNoPokedex(),
//       functions.getNoPokedex(),
//       functions.getNoPokedex(),
//       functions.getNoPokedex(),
//       functions.getNoPokedex(),
//     ];

//     const fetchPokemonData = async () => {
//       try {
//         const responses = await Promise.all(posiblesPokemons.map(pokemon => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)));
//         const pokemonData = await Promise.all(responses.map(response => response.json()));

//         setState(prevState => ({
//           ...prevState,
//           rival: {
//             ...prevState.rival,
//             team: {
//               ...prevState.rival.team,
//               dataPokemon: pokemonData,
//             },
//           },
//         }));
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchPokemonData();
//   }, [state.you.user, state.battle.seed]);

//   useEffect(() => {
//     const basePokemon = [];

//     state.rival.team.dataPokemon?.map((pokemon) => {
//       const base = {
//         levelPokemon: functions.getLevelPokemon(state.rival.user),
//         noPokedex: pokemon.id,
//         shiny: functions.getShiny(),
//         genre: functions.getGenre(),
//       }
//       basePokemon.push(base);
//     })

//     setState({ ...state, rival: { ...state.rival, team: { ...state.rival.team, basePokemon } } })
//   }, [state.rival.team.dataPokemon]);

//   useEffect(() => {
//     const fetchPokemonData = async () => {
//       const pokemons = [];

//       for (let i = 0; i < state.rival.team.basePokemon.length - 1; i++) {
//         const basePokemon = state.rival.team.basePokemon[i];
//         const pokemon = await functions.getPokemon(
//           state.rival.user,
//           state.rival.team.dataPokemon[i],
//           basePokemon.levelPokemon,
//           state.rival.rarity,
//           basePokemon.shiny,
//           basePokemon.genre
//         );
//         pokemons.push(pokemon);
//       }

//       //const pokemonSelected = pokemons[Math.floor(Math.random() * pokemons.length - 1)]
//       const indexSelectorPokemon = Math.round(Math.random() * (pokemons.length - 1))
//       const pokemonSelected = pokemons[indexSelectorPokemon]
//       //console.log("pokemonSelected",indexSelectorPokemon,pokemons.length-1, pokemonSelected);
//       const pokemonUserSelected = state.you.team?.pokemons[0]
//       setState({ ...state, you: { ...state.you, team: { ...state.you.team, selected: pokemonUserSelected } }, rival: { ...state.rival, team: { ...state.rival.team, pokemons, selected: pokemonSelected } } })
//     };
//     console.log("11111111111 userState", userState)
//     fetchPokemonData();
//   }, [state.rival.team.basePokemon,]);

//   useEffect(() => {
//     if (state.battle.phaseSelections == false) {

//     }
//   }, [state.battle.phaseSelections]);





//  

// export default Trainer