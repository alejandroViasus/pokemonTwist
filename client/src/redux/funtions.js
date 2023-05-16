const functionUser=(state, action)=>{
    const user = {
                ...state,
                user:{
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

export const functions={
    user:functionUser
}
