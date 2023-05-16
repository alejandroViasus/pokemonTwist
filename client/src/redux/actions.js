export const LOGIN = "LOGIN";

export const login = (email, nickname, picture) => {
    return async (dispatch) => {
        if (email !== "invitado") {
            try {
                const response = await fetch(`http://localhost:9000/api/users/email/${email}`);
                const data = await response.json();
                dispatch({
                    type: LOGIN,
                    payload: {
                        email: data.email,
                        gametag: data.nickname,
                        pictureTrainer: data.pictureTrainer,
                        experience: data.experience,
                        tickets: data.tickets,
                        pokeballs: data.pokeballs,
                        box: data.box,
                        wins: data.wins,
                        loss: data.loss,
                        league: data.league,
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    };
};


// export const LOGIN = "LOGIN";


// export const login = (email, nickname, picture) => {
//     return (dispatch) => {
//         //console.log(email)
//         if (email !== "invitado") {
//             fetch(`http://localhost:9000/api/users/email/${email}`)
//                 .then((response) => response.json())
//                 .then((data) => {
//                     dispatch({
//                         type: LOGIN,
//                         payload: {
//                             email: data.email,
//                             gametag: data.nickname,
//                             pictureTrainer: data.pictureTrainer,
//                             experience: data.experience,
//                             tickets: data.tickets,
//                             pokeballs: data.pokeballs,
//                             box: data.box,
//                             wins: data.wins,
//                             loss: data.loss,
//                             league: data.league,
//                         }
//                     })
//                 })
//         }

//     }
// }