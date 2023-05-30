import React from 'react'
import { dataBaseImages } from '../../../assets/variables';
import { functions, variables } from '../../../assets/variables';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { release, update } from '../../../redux/actions';


//!components

import ReleasePokemon from '../ReleasePokemon/ReleasePokemon';


function Card({ infoPokemon, changeUpdate, structure = "card" }) {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();
  const iconImage = "";
  const onClick = (e) => { }
  //console.log(infoPokemon);
  let imagePokemon = dataBaseImages.sprites.front_default(infoPokemon?.noPokedex)

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


    if (!infoPokemon.team && !infoPokemon.favorite) {
      const atributes = {
        scale: e.target.getAttribute("scale"),
        level: e.target.getAttribute("level"),
        shiny: e.target.getAttribute("shiny"),
        noPokedex: e.target.getAttribute("noPokedex"),
        id: e.target.id,
      }
      const releaseReward = functions.release(atributes);
      //console.log(releaseReward)

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


  //console.log(infoPokemon)
  return (
    <div>
      {(structure === "card") && (
        <div className="structure-card">
          <div className="s">------------------------------------------</div>
          {(state.release[0] !== 0 || state.release[1] !== 0) && (<ReleasePokemon release={clickRelease} cancel={clickCancel} pokemon={infoPokemon} trade={state.release} />)}

          <div className="icons">
            <button onClick={onClickTeam}>TEAM</button>
            <button onClick={onClickFavorite}>FAVORITE</button>
            {(infoPokemon.team) && (<div>in Team</div>)}
            {(infoPokemon.favorite) && (<div>in Favorite</div>)}
          </div>


          <div className="sprites">
            {infoPokemon.name}
            <img src={`${imagePokemon}`} style={{ height: "70px" }} alt="" />
            <div className="stadistics">
              {`HP:${functions.showStat(infoPokemon, variables.stadistic[1][0])}  ||`}
              {`ATT:${functions.showStat(infoPokemon, variables.stadistic[3][0])}  ||`}
              {`DFS:${functions.showStat(infoPokemon, variables.stadistic[5][0])}  ||`}
              {`SCL:${functions.showStat(infoPokemon, variables.stadistic[13][0])}  ||`}
              {infoPokemon.shiny && (<div className="shiny">** Shiny **</div>)}
              <div className="buttons">
                <div className="button-card"
                  id={infoPokemon._id}
                  scale={infoPokemon.scale}
                  level={infoPokemon.level}
                  nopokedex={infoPokemon.noPokedex}
                  shiny={(infoPokemon.shiny) ? 1 : 0}
                  onClick={onClickRelease}
                > Release</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(structure === "miniCard") && (
        <div className="structure-card">
          <div className="s">------------------------------------------</div>

          <div className="icons">
            <button onClick={onClickTeam}>TEAM</button>

          </div>
          <div className="sprites">
            {infoPokemon.name}
            <img src={`${imagePokemon}`} style={{ height: "70px" }} alt="" />
            <div className="stadistics">
              {infoPokemon.shiny && (<div className="shiny">** Shiny **</div>)}
            </div>
          </div>

        </div>
      )}

      {(structure === "selectorCard") && (
        <div className="structure-card">
          <div className="s">------------------------------------------</div>

          <div className="sprites">
            {infoPokemon.name}
            <img src={`${imagePokemon}`} style={{ height: "70px" }} alt="" />
            <div className="stadistics">
              {`HP:${functions.showStat(infoPokemon, variables.stadistic[1][0])}  ||`}
              {`ATT:${functions.showStat(infoPokemon, variables.stadistic[3][0])}  ||`}
              {`DFS:${functions.showStat(infoPokemon, variables.stadistic[5][0])}  ||`}
              {`SCL:${functions.showStat(infoPokemon, variables.stadistic[13][0])}  ||`}

              {infoPokemon.shiny && (<div className="shiny">** Shiny **</div>)}

            </div>

          </div>

        </div>
      )}


    </div>
  )
}

export default Card