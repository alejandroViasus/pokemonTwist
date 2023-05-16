const functionUser=(state, action)=>{
    const user = {
                ...state,
                user:{
                    version:action.payload.version,
                    ban:action.payload.ban,
                    email:action.payload.email,
                    gametag: action.payload.nickname,
                    pictureTrainer: action.payload.pictureTrainer,
                    experience: action.payload.experience,
                    tickets: action.payload.tickets,
                    pokeballs: action.payload.pokeballs,
                    box: action.payload.box,
                    wins: action.payload.wins,
                    loss: action.payload.loss,
                    league: action.payload.league,
                }
                
            } 
            return user        
}

const functionRegister=(state, action)=>{
    const user = {
                ...state,
                app:{
                    register:!state.app.register
                }
            } 
            return user        
}

export const functions={
    user:functionUser
}
