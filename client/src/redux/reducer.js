import {
    // LOGIN,
    // REGISTER
    INITIAL_USER
} from "./actions";

import { variables } from "../assets/variables";

const { functions } = require("./funtions")


const initialState = variables.initialState;

const rootReducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        default: return state;
        case INITIAL_USER:{
            //console.log(INITIAL_USER, action.payload);
            const newState={
                ...state,
                user:action.payload
            }
            return newState
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
    }

}

export default rootReducer;

