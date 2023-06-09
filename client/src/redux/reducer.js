import {
    // LOGIN,
    // REGISTER
    INITIAL_USER,
    UPDATE,
    FILTER_LIST,
    RELEASE,
    DISPATCH_USER,
    NEXT_MATCH,
    TOTAL_RELEASE
} from "./actions";

import { variables } from "../assets/variables";

const { functions } = require("./funtions")


const initialState = variables.initialState;

const rootReducer = (state = initialState.state, action) => {
    //console.log(action.type)
    switch (action.type) {
        default: return state;

        case DISPATCH_USER: {
            console.log(INITIAL_USER, action.payload);
            const newState = action.payload;
            return newState;
        }

        case INITIAL_USER: {
            //console.log(INITIAL_USER, action.payload);
            const newState = {
                ...state,
                you: {
                    ...state.you,
                    user: action.payload
                }
            }
            return newState
        }
        case UPDATE: {
            const newState = {
                ...state,
                user: action.payload
            }
            return newState

        }

        case FILTER_LIST: {
            const newState = {
                ...state,
                filtersList: action.payload
            }
            return newState
        }

        case RELEASE: {
            const newState = {
                ...state,
                app: { ...state.app, release: action.payload }
            }
            return newState;
        }
        case NEXT_MATCH: {
            const newState = {
                //   ...state,[user]:{...state[user],team:{...state[user].team,pokemons:[...state[user].team.pokemons,]}}
                ...state
            }
            newState[action.payload.user].team.pokemons[action.payload.pokemon.indexPokemon].heald=0;
            newState[action.payload.user].team.selected=action.payload.nextPokemon;
            newState.battle.phaseSelections=true;
            console.log("STATE REDUCER NEXT MATCH",newState);
            return newState;
        }
    }
}


        // case LOGIN: {
        //     const user = functions.user(state, action)
        //     console.log("LOGIN: __|", action.type, user.gametag);
        //     return user;
        // };
        // case REGISTER: {
        //     const user = functions.register(state, action)
        //     console.log("register: __|", action.type, user.gametag);
        //     return user;
        // };
   

export default rootReducer;

