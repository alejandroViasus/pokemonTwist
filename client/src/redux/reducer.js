import {
    LOGIN,
} from "./actions";

const { functions } = require("./funtions")


const initialState = {
    app: {},
    user: {
        email: "ejemplo@correo.com",
        gametag: "invitado",
        pictureTrainer: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/d/d5/latest/20171224032403/Campista_ROZA.png/250px-Campista_ROZA.png",
        experience: 100,
        tickets: 5,
        pokeballs: 10,
        box: 20,
        wins: 3,
        loss: 2,
        league: 1
    },
    rival: {},
    battle: {},
};

const rootReducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        default: return state;
        case LOGIN: {
            const user = functions.user(state, action)
            console.log("LOGIN: __|", action.type, user.gametag);
            return user;
        };
    }

}

export default rootReducer;

