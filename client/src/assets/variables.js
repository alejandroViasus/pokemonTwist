const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
const day = today.getDate();



export const variables={
    initialState : {
        app: {
            loging:false,
            register:false,
        },
        user: {
            version:"0.1",
            ban:false,
            email: "ejemplo@correo.com",
            gametag: "invitado",
            pictureTrainer: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/d/d5/latest/20171224032403/Campista_ROZA.png/250px-Campista_ROZA.png",
            experience: 0,
            tickets: 5,
            pokeballs: 50,
            box: 20,
            wins: 0,
            loss: 0,
            league: 0,
            birthDay:`${year}-${month}-${day}`,
            level:1,
            phone:0,
        },
        rival: {},
        battle: {},
    },
    imagesTrainers:[
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/026.png",
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/027.png",
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/028.png",
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/029.png",
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/030.png",
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/031.png",
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/032.png",
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/033.png",
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/034.png",
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png",
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/036.png",
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/037.png",
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/038.png",
    ],

};
