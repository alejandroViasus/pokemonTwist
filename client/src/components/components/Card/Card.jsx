import React from 'react'
import { dataBaseImages } from '../../../assets/variables';
import { functions, variables } from '../../../assets/variables';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { release, update } from '../../../redux/actions';



//!components

import ReleasePokemon from '../ReleasePokemon/ReleasePokemon';
import SecundaryBG from '../CardCompnents/SecundaryBG';
import AuraBgComponent from '../CardCompnents/AuraBgComponent';
import SelectorIconType from '../CardCompnents/SelectorIconType';
import SelectorIconTypeMini from '../CardCompnents/SelectorIconTypeMini';
import bgCardTitle from "../../../assets/svg/componentsCard/bgCardTitle.svg"
import ShowStack from '../ShowStack/ShowStack';
import ShowIconTypes from '../ShowIconTypes/ShowIconTypes';
import SemiCircle from '../CardCompnents/SemiCircle';
import FaceB from '../CardCompnents/FaceB';



import bgSemicirculo from "../../../assets/svg/componentsCard/fondoSemiCirculo.svg"
import Separator from '../separator/Separator';


import IconLike from "../../../assets/svg/icons/iconLike.svg"
import IconLike0 from "../../../assets/svg/icons/iconLike0.svg"
import IconTeam from "../../../assets/svg/icons/iconTeam.svg"
import IconTeam0 from "../../../assets/svg/icons/iconTeam0.svg"
import IconTurn from "../../../assets/svg/icons/iconTurn.svg"


function Card({ infoPokemon, changeUpdate, structure = "card" }) {
  const user = useSelector(state => state.you.user)
  const dispatch = useDispatch();
  const iconImage = "";
  let iconTeam = IconTeam0;
  let iconLike = IconLike0;
  if (infoPokemon.team) iconTeam = IconTeam;
  if (infoPokemon.favorite) iconLike = IconLike

  const onClick = (e) => { }


  console.log("INFO__F", infoPokemon);
  let imagePokemon = dataBaseImages.sprites.front_default(infoPokemon?.noPokedex)
  let imageDetailPokemon = dataBaseImages.official.default(infoPokemon?.noPokedex)
  if (infoPokemon.shiny) {
    imageDetailPokemon = dataBaseImages.official.shiny(infoPokemon?.noPokedex)
  }

  if (structure === "card") {
    imagePokemon = dataBaseImages.official.default(infoPokemon?.noPokedex)
    if (infoPokemon.shiny) {
      imagePokemon = dataBaseImages.official.shiny(infoPokemon.noPokedex);
    }
  } else if (structure === "miniCard") {
    imagePokemon = dataBaseImages.sprites.front_default(infoPokemon?.noPokedex)
    if (infoPokemon.shiny) {
      imagePokemon = dataBaseImages.sprites.front_shiny(infoPokemon.noPokedex);
    }
  }


  const [state, setState] = useState({
    release: [0, 0, 0],
    rotation: [0, 180],
    opacity: [100, 0],
  })

  const onClickTeam = async () => {
    try {
      fetch(`http://localhost:9000/api/pokemons/${user.email}/team`)
        .then(response => response.json())
        .then(data => {
          //console.log(data.length)
          if (data.length < variables.sizeTeam || infoPokemon.team) {
            addTeam();
          } else {
            alert(`superaste el maximo de integrantes en tu equipo (${variables.sizeTeam})`)
          }

        })
    } catch (error) {
      console.error(error);
    }
  };

  const addTeam = async () => {
    const updatePokemon = { ...infoPokemon, team: !infoPokemon.team, favorite: !infoPokemon.team, new: false };
    try {
      const response = await fetch(`http://localhost:9000/api/pokemons/${infoPokemon._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePokemon),
      })
      if (response.ok) {
        if (!infoPokemon.team) {
          console.log(`new Team ${infoPokemon.name}`);

        } else {
          console.log(`out Team ${infoPokemon.name}`);
        }
      }
      changeUpdate();

    } catch (error) {
      console.log(error)
    }
  }

  const onClickFavorite = async () => {
    const updatePokemon = { ...infoPokemon, favorite: !infoPokemon.favorite, new: false };

    try {
      const response = await fetch(`http://localhost:9000/api/pokemons/${infoPokemon._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePokemon),
      })
      if (response.ok) {
        if (!infoPokemon.team) {
          console.log(`new Favorite ${infoPokemon.name}`);
        } else {
          console.log(`out Favorite ${infoPokemon.name}`);
        }
      }
      changeUpdate();

    } catch (error) {
      console.log(error)
    }
  };


  const onClickRelease = async (e) => {

    console.log("release?")
    if (!infoPokemon.team && !infoPokemon.favorite) {
      const atributes = {
        scale: e.target.getAttribute("scale") || infoPokemon.scale,
        level: e.target.getAttribute("level") || infoPokemon.level,
        shiny: e.target.getAttribute("shiny") || infoPokemon.shiny,
        noPokedex: e.target.getAttribute("noPokedex") || infoPokemon.noPokedex,
        id: e.target.id || infoPokemon._id,
      }
      const releaseReward = functions.release(atributes);
      console.log("__--__--", releaseReward)

      setState({ ...state, release: releaseReward })
    } else {
      if (infoPokemon.team) {
        alert(`no puedes liberar un pokemon que este en tu equipo`)
      } else if (infoPokemon.favorite) {
        alert(`no puedes liberar un pokemon que tengas como favorito`)
      }
    }

  }

  const clickRelease = async () => {
    try {
      const response = await fetch(`http://localhost:9000/api/pokemons/${infoPokemon._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // La solicitud fue exitosa
        const updateUser = { ...user }
        updateUser.tickets = updateUser.tickets + state.release[1];
        updateUser.pokeballs = updateUser.pokeballs + state.release[0];
        updateUser.coins = updateUser.coins + state.release[2];
        try {
          const response = await fetch(`http://localhost:9000/api/users/${user._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateUser),
          });

          if (response.ok) {
            console.log('Pokemon Release');
            dispatch(release(infoPokemon._id))
            dispatch(update(updateUser));
          }



        } catch (error) {
          console.log(error);
        }

      }

    } catch (error) {

    }
  }

  const clickCancel = () => {
    setState({ ...state, release: [0, 0] })
  }

  const turn = () => {
    // const cardB=document.getElementById("card-b");
    // const cardA=document.getElementById("card-a");
    // cardA.style.transform.rotateY="360deg"

    let rotateCardA = state.rotation[0];
    let rotateCardB = state.rotation[1];

    let opacityA = state.opacity[0];
    let opacityB = state.opacity[1];

    if (rotateCardA === 0) {
      rotateCardA = rotateCardA + 180;
      rotateCardB = rotateCardB + 180;
    } else {
      rotateCardA = rotateCardA - 180;
      rotateCardB = rotateCardB - 180;
    }

    if (rotateCardA === 180) {
      opacityA = 0;
    } else {
      opacityA = 100;
    }
    if (rotateCardA === 180) {
      opacityB = 0;
    } else {
      opacityB = 100;
    }

    setState({
      ...state,
      rotation: [rotateCardA, rotateCardB],
      opacity: [opacityA, opacityB]
    })

  }

  const types = infoPokemon.types.split(",")

  const type1 = variables.types[types[0]]
  const type2 = variables.types[types[1] || types[0]]
  console.log(type1)

  const bgColor = variables.colorTypes[type1]?.primaryColorBg || `rgba(222,222,222,0.1)`;
  const bgSecondColor = variables.colorTypes[type1]?.secondaryColorBg || `rgba(222,222,222,0.1)`;
  const auraColor = variables.colorTypes[type1]?.colorHalo || `rgba(222,222,222,0.1)`;
  let noPokedex = infoPokemon?.noPokedex || "1";

  return (
    <div className='content-card'>


      {(structure === "card") && (

        <div className="structure-card" >

          <div
            className="card-b"
            id='card-b'
            style={{
              transform: `perspective(500px) rotateY(${state.rotation[1]}deg)`
            }}
          >
            {/* 
            <img className='img-titleCard' src={`${bgCardTitle}`} alt="" />
            <div className="no-pokedex" style={{ color: `${bgColor}` }} ># {noPokedex}</div>
            <div className="name" style={{ color: `${bgColor}` }} >{infoPokemon.name}</div>
            <SelectorIconTypeMini type={type1} color={bgColor} />
            {(state.release[0] !== 0 || state.release[1] !== 0) && (<ReleasePokemon release={clickRelease} cancel={clickCancel} pokemon={infoPokemon} trade={state.release} />)}
            

            <img
              src={IconTurn}
              alt="icon-turn"
              className="icon-turn"
              id={infoPokemon._id}
              scale={infoPokemon.scale}
              level={infoPokemon.level}
              shiny={(infoPokemon.shiny) ? 1 : 0}
              onClick={turn}
            /> 
            */}

            {(state.release[0] === 0 || state.release[1] === 0) && (

              <img
                src={IconTurn}
                alt="icon-turn"
                className="icon-turn"
                id={infoPokemon._id}
                scale={infoPokemon.scale}
                level={infoPokemon.level}
                shiny={(infoPokemon.shiny) ? 1 : 0}
                onClick={turn}
              />

            )}
            <FaceB color={bgColor} info={infoPokemon} release={clickRelease} cancel={clickCancel} trade={state.release} changeRelease={onClickRelease} />

          </div>

          <div className="card-a" id='card-a'
            style={
              {
                backgroundColor: `${bgColor}`,
                backgroundColor: `rgba(22,22,22,0.5)`,
                transform: `perspective(500px) rotateY(${state.rotation[0]}deg)`,
                opacity: `${state.opacity[0]}%`
              }
            }
          >
            <div className="bg-card" style={{ backgroundColor: `${bgColor}` }} >
              .
            </div>
            <SecundaryBG fill={bgSecondColor} />
            <img className='img-titleCard' src={`${bgCardTitle}`} alt="" />
            <AuraBgComponent fill={auraColor} />
            <SemiCircle fill={auraColor} />
            <SelectorIconType type={type1} color={bgColor} />
            <SelectorIconTypeMini type={type1} color={bgColor} />
            <div className="shadow">.</div>
            <img className='img-pokemon' src={`${imagePokemon}`} alt="" />
            <div className="no-pokedex" style={{ color: `${bgColor}` }} ># {noPokedex}</div>
            <div className="name" style={{ color: `${bgColor}` }} >{infoPokemon.name}</div>
            <div className="level-stats">
              <div className="level">
                <div className="text">lvl.</div>
                <div className="value-lvl">{infoPokemon.level}</div>
              </div>
              <Separator height={2} width={40} color={`rgba(222 ,222,222,1`} />
              <div className="stats"> {`SCL:${functions.showStat(infoPokemon, variables.stadistic[13][0])}`} </div>
            </div>

            <ShowIconTypes infoPokemon={infoPokemon} />

            {(state.release[0] === 0 || state.release[1] === 0) && (
              <div className="stats-simple">
                <ShowStack infoPokemon={infoPokemon} stack="HP" />
                <ShowStack infoPokemon={infoPokemon} stack="ATK" />
                <ShowStack infoPokemon={infoPokemon} stack="DFS" />
              </div>
            )}

            {(state.release[0] === 0 || state.release[1] === 0) && (
              <div className="status">
                <img
                  src={iconTeam}
                  alt="icon-team"
                  className={`team ${infoPokemon.team ? 'active' : 'no-active'}`}
                  onClick={onClickTeam}
                />
                <img
                  src={iconLike}
                  alt="icon-like"
                  className={`team ${infoPokemon.favorite ? 'active' : 'no-active'}`}
                  onClick={onClickFavorite}
                />


              </div>
            )}


            {(state.release[0] === 0 || state.release[1] === 0) && (
              <img
                src={IconTurn}
                alt="icon-turn"
                className="icon-turn"
                id={infoPokemon._id}
                scale={infoPokemon.scale}
                level={infoPokemon.level}
                shiny={(infoPokemon.shiny) ? 1 : 0}
                onClick={turn}
              />
            )}

            {(state.release[0] === 0 || state.release[1] === 0) && (
              <div className="release"
                onClick={onClickRelease}
              >
                release
              </div>
            )}

            {(
              state.release[0] !== 0 || state.release[1] !== 0) && (<ReleasePokemon release={clickRelease} cancel={clickCancel} pokemon={infoPokemon} trade={state.release} />
              )}
          </div>

        </div>
      )}

      {(structure === "miniCard") && (
        <div className="structure-card-mini">


          <div className="icon-close" onClick={onClickTeam}>
            <div className="x">
              X
            </div>
          </div>
          <div className="sprites">
            <img src={`${imagePokemon}`} style={{ width: "70%" }} alt="" />
          </div>

        </div>
      )}

      {(structure === "selectorCard") && (
        <div className="pokemon-selection">

          {/* {infoPokemon.name} */}
          <img className='icon-selection-pokemon' src={`${imagePokemon}`} alt="" />
          <div className="level">
            <div>{`lvl .`}</div>
            <div className="value"> 
              {infoPokemon.level}</div>
          </div>
          {/* <div className="stadistics">
              {`HP:${functions.showStat(infoPokemon, variables.stadistic[1][0])}  ||`}
              {`ATT:${functions.showStat(infoPokemon, variables.stadistic[3][0])}  ||`}
              {`DFS:${functions.showStat(infoPokemon, variables.stadistic[5][0])}  ||`}
              {`SCL:${functions.showStat(infoPokemon, variables.stadistic[13][0])}  ||`}
              
              {infoPokemon.shiny && (<div className="shiny">** Shiny **</div>)}
              
            </div> */}

        </div>
      )}
      {(structure === "selectedCard") && (
        <div className="structure-card">
          <div className="selected-card" style={{ backgroundColor: " rgba(175,221,233,1)" }}>
            <div className="name-pokemon-selected">
              {infoPokemon.name}
            </div>
            <div className="level-pokemon-selected">
              {infoPokemon.level}
            </div>
            <img className='img-pokemon-selected' src={`${imageDetailPokemon}`} alt="" />
          </div>

        </div>
      )}
    </div>
  )
}

export default Card






//!!


//!!





{/*
        <div className="structure-card-big">
          <div className="lamina" style={{ backgroundColor: `${bgColor}` }}></div>
         
          
          
          


          
        

        
          <div className="icons">
            <button onClick={onClickTeam}>TEAM</button>
            <button onClick={onClickFavorite}>FAVORITE</button>
            {(infoPokemon.team) && (<div>in Team</div>)}
            {(infoPokemon.favorite) && (<div>in Favorite</div>)}
          </div>


          <div className="sprites">
            
            <div className="stadistics">
              {`HP:${functions.showStat(infoPokemon, variables.stadistic[1][0])}  ||`}
              {`ATT:${functions.showStat(infoPokemon, variables.stadistic[3][0])}  ||`}
              {`DFS:${functions.showStat(infoPokemon, variables.stadistic[5][0])}  ||`}
              {`SCL:${functions.showStat(infoPokemon, variables.stadistic[13][0])}  ||`}
              {infoPokemon.shiny && (<div className="shiny">** Shiny **</div>)}
              <div className="buttons">
                
              </div>
            </div>
            </div>
          </div> */}