const d = document;
const { variables, functions } = require("../../../assets/variables");

export const functionsBattle = {

    getStartDiretion: (speed) => {
        if (speed !== undefined) {
            const directionX = Math.random();
            const directionY = Math.random();
            const speedX = Math.round(Math.random() * speed);
            const speedY = Math.round(Math.random() * speed);
            const rotation = Math.random();

            const direction = []

            if (directionX >= 0.5) {
                direction.push("+");
            } else {
                direction.push("-");
            }
            if (directionY >= 0.5) {
                direction.push("+");
            } else {
                direction.push("-");
            } if (rotation >= 0.5) {
                direction.push(0.1 + (rotation * speed / 4));
            } else {
                direction.push(-1 * (0.1 + (rotation * speed / 4)));
            }
            direction.push(speedX, speedY);
            console.log("DIR", direction)
            return direction;
        }
    },

    //*BattlePokemon.................................................................................................................
    setBattlePokemon: (state) => {
        const uPokemon = state.you.team.selected;
        const rivalPokemon = state.rival.team.selected;
        const $rivalPokemon = document.getElementById("pokemon-rival-inbattle");
        const $rivalPokemonImg = document.getElementById("rivalPokemonImg");
        const $uPokemon = document.getElementById("pokemon-user-inbattle");
        const $uPokemonImg = document.getElementById("userPokemonImg");
        const $stadium = document.getElementById("battleField-stadium");

        if (uPokemon.direction === undefined) {
            uPokemon.speed = functions.showStat(uPokemon, variables.stadistic[11][0])
            uPokemon.direction = functionsBattle.getStartDiretion(uPokemon.speed);
            uPokemon.positionX = 0;
            uPokemon.positionY = 0;
            uPokemon.rotation = 0;
            uPokemon.speedX = 1;
            uPokemon.speedY = 1;
            uPokemon.actualHealdToCero = 0;
        }
        if (rivalPokemon.direction === undefined) {
            rivalPokemon.speed = functions.showStat(rivalPokemon, variables.stadistic[11][0])
            rivalPokemon.direction = functionsBattle.getStartDiretion(rivalPokemon.speed);
            rivalPokemon.positionX = 0;
            rivalPokemon.positionY = 0;
            rivalPokemon.rotation = 0;
            rivalPokemon.speedX = 1;
            rivalPokemon.speedY = 1;
            rivalPokemon.actualHealdToCero = 0;
        }

        const moveUPokemon = functionsBattle.setMovePokemon(uPokemon, $uPokemon, $stadium, "uPokemon",state.battle.battleSpeed)

        const moveRivalPokemon = functionsBattle.setMovePokemon(rivalPokemon, $rivalPokemon, $stadium, "rivalPokemon",state.battle.battleSpeed);

        console.log("moveuPokemon: ", moveUPokemon)

        uPokemon.positionX = moveUPokemon[0];
        uPokemon.positionY = moveUPokemon[1];
        uPokemon.rotation = moveUPokemon[2];
        if (uPokemon.rotation >= 360) {
            uPokemon.rotation = uPokemon.rotation - 360;
            //console.log("change", uPokemon.rotation);
        }
        if (uPokemon.rotation <= 0) {
            uPokemon.rotation = uPokemon.rotation + 360;
            //console.log("change", uPokemon.rotation);
        }


        //uPokemon.direction=[moveUPokemon[3],moveUPokemon[4]]
        uPokemon.direction[0] = moveUPokemon[3];
        uPokemon.direction[1] = moveUPokemon[4];
        uPokemon.speedX = moveUPokemon[5];
        uPokemon.speedY = moveUPokemon[6];

        rivalPokemon.positionX = moveRivalPokemon[0];
        rivalPokemon.positionY = moveRivalPokemon[1];
        rivalPokemon.rotation = moveRivalPokemon[2];
        if (rivalPokemon.rotation > 360) {
            rivalPokemon.rotation = rivalPokemon.rotation - 360;
            console.log("change", rivalPokemon.rotation);
        }
        if (rivalPokemon.rotation <= 0) {
            rivalPokemon.rotation = rivalPokemon.rotation + 360;
            console.log("change", rivalPokemon.rotation);
        }


        //rivalPokemon.direction=[moveRivalPokemon[3],moveRivalPokemon[4]]
        rivalPokemon.direction[0] = moveRivalPokemon[3];
        rivalPokemon.direction[1] = moveRivalPokemon[4];
        rivalPokemon.speedX = moveRivalPokemon[5];
        rivalPokemon.speedY = moveRivalPokemon[6];

        if ($rivalPokemon !== undefined && $rivalPokemon !== null || $uPokemon !== undefined && $uPokemon !== null) {

            const limitRivalPokemon = $rivalPokemon.getBoundingClientRect();
            const limitUPokemon = $uPokemon.getBoundingClientRect();
            const limitStadium = $stadium.getBoundingClientRect();
            const fractionStadiumX = limitStadium.width / 1000;
            const fractionStadiumY = limitStadium.height / 1000;
            //console.log("LIMI STADIUM: ", limitStadium);


            $rivalPokemon.style.transform = `translate(${moveRivalPokemon[0] * fractionStadiumX}px,${moveRivalPokemon[1] * fractionStadiumY}px) rotate(${moveRivalPokemon[2] || rivalPokemon.rotation}deg)`;
            $rivalPokemonImg.style.transform = `rotate(${-1 * (moveRivalPokemon[2] || rivalPokemon.rotation)}deg)`;



            $uPokemon.style.transform = `translate(${moveUPokemon[0] * fractionStadiumX}px,${moveUPokemon[1] * fractionStadiumY}px) rotate(${moveUPokemon[2] || uPokemon.rotation}deg)`;
            $uPokemonImg.style.transform = `rotate(${-1 * (moveUPokemon[2] || uPokemon.rotation)}deg)`;
        }

        const newState = {
            ...state,
            battle: {
                ...state.battle, seed: Math.random() + Math.random() * Math.random() + Math.random()
            },
            you: {
                ...state.you,
                team: {
                    ...state.you.team,
                    selected: uPokemon
                }
            },
            rival: {
                ...state.rival,
                team: {
                    ...state.rival.team,
                    selected: rivalPokemon
                }
            }
        }

        const otherBattle = functionsBattle.setphasePunck(newState);


       
        return newState

    },

    setMovePokemon: (pokemon, locationPokemon, locationStadium,flag,speed=1) => {

        console.log("MOVEEEEEEEEEE", pokemon)
        const _locationPokemon = locationPokemon.getBoundingClientRect();
        const _locationStadium = locationStadium.getBoundingClientRect();

        const reductionSpeed = speed;
        //*Locations - stadium
        const stadiumLeft = _locationStadium.left;
        const stadiumRight = _locationStadium.right;
        const stadiumTop = _locationStadium.top;
        const stadiumBottom = _locationStadium.bottom;
        //*Locations - pokemon
        const pokemonLeft = _locationPokemon.left;
        const pokemonRight = _locationPokemon.right;
        const pokemonTop = _locationPokemon.top;
        const pokemonBottom = _locationPokemon.bottom;

        const directionX = pokemon.direction[0]
        const directionY = pokemon.direction[1]
        const rotation = pokemon.rotation + ((0.1 + parseInt(pokemon.speed * pokemon.direction[2]) / 2));
        const longMoveX = (25 + parseInt((1 + pokemon.speedX * 2) * pokemon.direction[3])) / (reductionSpeed)
        const longMoveY = (25 + parseInt((1 + pokemon.speedY * 2) * pokemon.direction[4])) / (reductionSpeed)

        let direction = "R-U";
        if (directionX === "+" && directionY === "+") {
            direction = "R-D";
        } else
            if (directionX === "-" && directionY === "+") {
                direction = "L-D";
            } else
                if (directionX === "-" && directionY === "-") {
                    direction = "L-U";
                }

        console.log("speedXY", longMoveX, longMoveY, pokemon.direction[3], pokemon.direction[4], pokemon.speed)

        switch (direction) {
            case "R-U":
                //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                pokemon.positionX = pokemon.positionX + longMoveX;
                pokemon.positionY = pokemon.positionY - longMoveY;
                //console.log(flag, "Y R-U:", pokemonTop - longMoveY, stadiumTop, pokemonTop - longMoveY <= stadiumTop);
                //console.log(flag, "X R-U:", pokemonRight + longMoveX, stadiumRight, pokemonRight + longMoveX >= stadiumRight);
                if (pokemonTop - longMoveY <= stadiumTop) {
                    pokemon.direction[1] = "+";
                    const limits = functionsBattle.limitStadium(pokemon.speed)
                    pokemon.speedX = limits[0] / reductionSpeed;
                    pokemon.speedY = limits[1] / reductionSpeed;
                    pokemon.rotation = limits[2];
                }
                if (pokemonRight + longMoveX >= stadiumRight) {
                    pokemon.direction[0] = "-";
                    const limits = functionsBattle.limitStadium(pokemon.speed)
                    pokemon.speedX = limits[0] / reductionSpeed;
                    pokemon.speedY = limits[1] / reductionSpeed;
                    pokemon.rotation = limits[2];
                }

                //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                break;
            case "R-D":
                //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)

                pokemon.positionX = (pokemon.positionX + longMoveX);
                pokemon.positionY = pokemon.positionY + longMoveY;
                //console.log(flag, "Y R-D:", pokemonBottom + longMoveY, stadiumBottom, pokemonBottom + longMoveY >= stadiumBottom);
                //console.log(flag, "X R-D:", pokemonRight + longMoveX, stadiumRight, pokemonRight + longMoveX >= stadiumRight);
                if (pokemonBottom + longMoveY >= stadiumBottom) {
                    pokemon.direction[1] = "-";
                    const limits = functionsBattle.limitStadium(pokemon.speed)
                    pokemon.speedX = limits[0] / reductionSpeed;
                    pokemon.speedY = limits[1] / reductionSpeed;
                    pokemon.rotation = limits[2];
                }
                if (pokemonRight + longMoveX >= stadiumRight) {
                    pokemon.direction[0] = "-";
                    const limits = functionsBattle.limitStadium(pokemon.speed)
                    pokemon.speedX = limits[0] / reductionSpeed;
                    pokemon.speedY = limits[1] / reductionSpeed;
                    pokemon.rotation = limits[2];
                }

                //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                break;
            case "L-U":
                pokemon.positionX = pokemon.positionX - longMoveX;
                pokemon.positionY = pokemon.positionY - longMoveY;
                //console.log(flag, "Y L-U:", pokemonTop - longMoveY, stadiumTop, pokemonTop - longMoveY <= stadiumTop);
                //console.log(flag, "X L-U:", pokemonLeft - longMoveX, stadiumLeft, pokemonLeft - longMoveX <= stadiumLeft);

                if (pokemonTop - longMoveY <= stadiumTop) {
                    pokemon.direction[1] = "+";
                    const limits = functionsBattle.limitStadium(pokemon.speed)
                    pokemon.speedX = limits[0] / reductionSpeed;
                    pokemon.speedY = limits[1] / reductionSpeed;
                    pokemon.rotation = limits[2];
                }
                if (pokemonLeft - longMoveX <= stadiumLeft) {
                    pokemon.direction[0] = "+";
                    const limits = functionsBattle.limitStadium(pokemon.speed)
                    pokemon.speedX = limits[0] / reductionSpeed;
                    pokemon.speedY = limits[1] / reductionSpeed;
                    pokemon.rotation = limits[2];
                }
                //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                break;
            case "L-D":
                //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                pokemon.positionX = pokemon.positionX - longMoveX;
                pokemon.positionY = pokemon.positionY + longMoveY;
                //console.log(flag, "Y L-D:", pokemonBottom + longMoveY, stadiumBottom, pokemonBottom + longMoveY >= stadiumBottom);
                //console.log(flag, "X L-U:", pokemonLeft - longMoveX, stadiumLeft, pokemonLeft - longMoveX <= stadiumLeft);

                if (pokemonBottom + longMoveY >= stadiumBottom) {
                    pokemon.direction[1] = "-";
                    const limits = functionsBattle.limitStadium(pokemon.speed)
                    pokemon.speedX = limits[0] / reductionSpeed;
                    pokemon.speedY = limits[1] / reductionSpeed;
                    pokemon.rotation = limits[2];
                }
                if (pokemonLeft - longMoveX <= stadiumLeft) {
                    pokemon.direction[0] = "+";
                    const limits = functionsBattle.limitStadium(pokemon.speed)
                    pokemon.speedX = limits[0] / reductionSpeed;
                    pokemon.speedY = limits[1] / reductionSpeed;
                    pokemon.rotation = limits[2];
                }
                //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                break;
        }

        const Direc = [pokemon.positionX, pokemon.positionY, rotation, pokemon.direction[0], pokemon.direction[1], pokemon.speedX, pokemon.speedY]

        console.log("888888888888888888888888888888", Direc)

        return Direc;

    },

    setphasePunck: (state) => {
        console.log("punchSatate", state)
        const newState = { ...state };
        newState.rival.team.selected = functionsBattle.setCollisionCheck("rival", "user", state.rival.team.selected, "", state.you.team.selected)
        newState.you.team.selected = functionsBattle.setCollisionCheck("user", "rival", state.you.team.selected, "", state.rival.team.selected);

        return newState
    },

    setCollisionCheck: (flag, rival, pokemon, obstaculoId = "", dataRival) => {

        if (pokemon !== undefined) {

            //console.log("COLLISION init: ", flag,rival);
            let $rivalPokemon = document.getElementById("pokemon-rival-inbattle");
            let $uPokemon = document.getElementById("pokemon-user-inbattle");




            //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", pokemon,flag)

            if (flag === "rival" && rival === "user") {
                $rivalPokemon = document.getElementById("pokemon-user-inbattle");
                $uPokemon = document.getElementById("pokemon-rival-inbattle");
            }
            if (flag === "user" && rival === "rival") {
                $rivalPokemon = document.getElementById("pokemon-rival-inbattle");
                $uPokemon = document.getElementById("pokemon-user-inbattle");
            }
            if (flag === "rival" && rival === "object") {
                $rivalPokemon = document.getElementById(`${obstaculoId}`);
                $uPokemon = document.getElementById("pokemon-rival-inbattle");
            }
            if (flag === "user" && rival === "object") {
                $rivalPokemon = document.getElementById(`${obstaculoId}`);
                $uPokemon = document.getElementById("pokemon-user-inbattle");
            }

            let locationPokemon = $uPokemon.getBoundingClientRect();
            let locationRivalPokemon = $rivalPokemon.getBoundingClientRect();

            //console.log("................", flag, ".................", locationPokemon.bottom - locationPokemon.top, locationPokemon)
            let pointsPokemon = {
                LB: {
                    x: locationPokemon.left,
                    y: locationPokemon.bottom,
                },
                LT: {
                    x: locationPokemon.left,
                    y: locationPokemon.top,
                },
                RB: {
                    x: locationPokemon.right,
                    y: locationPokemon.bottom,
                },
                RT: {
                    x: locationPokemon.right,
                    y: locationPokemon.top,
                },
            };

            //! colisionRival
            if (
                pointsPokemon.LB.x > locationRivalPokemon.left &&
                pointsPokemon.LB.x < locationRivalPokemon.right &&
                pointsPokemon.LB.y > locationRivalPokemon.top &&
                pointsPokemon.LB.y < locationRivalPokemon.bottom
                ||
                pointsPokemon.LT.x > locationRivalPokemon.left &&
                pointsPokemon.LT.x < locationRivalPokemon.right &&
                pointsPokemon.LT.y > locationRivalPokemon.top &&
                pointsPokemon.LT.y < locationRivalPokemon.bottom
            ) {

                if (rival !== "object") {
                    console.log("puch");
                    functionsBattle.setCollision(pokemon, flag, dataRival);
                }
                pokemon.direction[0] = "+";

            };
            if (
                pointsPokemon.LT.y > locationRivalPokemon.top &&
                pointsPokemon.LT.y < locationRivalPokemon.bottom &&
                pointsPokemon.LT.x > locationRivalPokemon.left &&
                pointsPokemon.LT.x < locationRivalPokemon.right
                ||
                pointsPokemon.RT.y > locationRivalPokemon.top &&
                pointsPokemon.RT.y < locationRivalPokemon.bottom &&
                pointsPokemon.RT.x > locationRivalPokemon.left &&
                pointsPokemon.RT.x < locationRivalPokemon.right
            ) {
                if (rival !== "object") {
                    console.log("puch");
                    functionsBattle.setCollision(pokemon, flag, dataRival);
                }
                pokemon.direction[1] = "+";
            };
            if (
                pointsPokemon.RB.x < locationRivalPokemon.right &&
                pointsPokemon.RB.x > locationRivalPokemon.left &&
                pointsPokemon.RB.y > locationRivalPokemon.top &&
                pointsPokemon.RB.y < locationRivalPokemon.bottom
                ||
                pointsPokemon.RT.x < locationRivalPokemon.right &&
                pointsPokemon.RT.x > locationRivalPokemon.left &&
                pointsPokemon.RT.y > locationRivalPokemon.top &&
                pointsPokemon.RT.y < locationRivalPokemon.bottom
            ) {
                if (rival !== "object") {
                    console.log("puch");
                    functionsBattle.setCollision(pokemon, flag, dataRival);
                }
                pokemon.direction[0] = "-";
            };
            if (
                pointsPokemon.LB.y < locationRivalPokemon.bottom &&
                pointsPokemon.LB.y > locationRivalPokemon.top &&
                pointsPokemon.LB.x < locationRivalPokemon.left &&
                pointsPokemon.LB.x > locationRivalPokemon.right
                ||
                pointsPokemon.RB.y < locationRivalPokemon.bottom &&
                pointsPokemon.RB.y > locationRivalPokemon.top &&
                pointsPokemon.RB.x > locationRivalPokemon.left &&
                pointsPokemon.RB.x < locationRivalPokemon.right

            ) {
                if (rival !== "object") {
                    console.log("puch");
                    functionsBattle.setCollision(pokemon, flag, dataRival);
                }
                pokemon.direction[1] = "-";
            };



        }
        return pokemon;
    },

    setCollision: (pokemon, flag, rival) => {

        let rotation = pokemon.rotation

        const splitPokemon = pokemon.types.split(",");
        let allTypesPokemon = [variables.types[splitPokemon[0]], variables.types[splitPokemon[1] || splitPokemon[0]]]
        console.log("Types__", allTypesPokemon, pokemon);
        let typePokemon = allTypesPokemon[0]

        const splitRival = rival.types.split(",");
        let allTypesRival = [variables.types[splitRival[0]], variables.types[splitRival[1] || splitRival[0]]]
        console.log("Types__", allTypesPokemon, pokemon);
        let typeRival = allTypesRival[0]



        // let Type = pokemon.types[0];
        // let TypeOponent = rival.types[0];

        if (pokemon.rotation > 180 && pokemon.rotation <= 270) {
            typePokemon = allTypesPokemon[0]
        } else {
            typePokemon = allTypesPokemon[1]
        }
        if(typePokemon===undefined){
            typePokemon="normal"
        }
        
        if (rival.rotation > 180 && rival.rotation <= 270) {
            typeRival = allTypesRival[0]
        } else {
            typeRival = allTypesRival[1]
        }
        
        if(typeRival===undefined){
            typeRival="normal"
        }
        let scaleAttack = 0.5;
        let attack = 0;

        let typeAttack = Math.random()

        if (typeAttack < 0.5) {
            //?................................................................................................
            console.log(typePokemon, typeRival);

            if (variables.PokemonStrengthsTypes[typePokemon||"normal"]?.weaknesses.includes(typeRival||"normal")||false) {
                scaleAttack = 0.25;
            }

            if (variables.PokemonStrengthsTypes[typePokemon||"normal"]?.strengths.includes(typeRival||"normal")||false) {
                scaleAttack = 1;
            }

            let perfectBlock = Math.random();

            if (perfectBlock > 0.8) {
                attack = 1
            } else {
                attack = Math.round((scaleAttack * (functions.showStat(rival, variables.stadistic[3][0]) * Math.random()) + (functions.showStat(rival, variables.stadistic[3][0]))));
            }

            let defense = functions.showStat(pokemon, variables.stadistic[5][0])

            let punch = attack - defense

            if (punch <= 10) {
                punch = 10;
            }

            let heald = functions.showStat(pokemon, variables.stadistic[1][0])

            if (pokemon.actualHealdToCero === undefined || pokemon.actualHealdToCero === NaN) {
                pokemon.actualHealdToCero = 0;
            }

            pokemon.actualHealdToCero = pokemon.actualHealdToCero + punch

            console.log("__heald__", flag,
                heald,
                punch,
                pokemon.actualHealdToCero

            )

            pokemon.actualHealdToCero = pokemon.actualHealdToCero + punch

            // console.log(`//=>`, flag, TypeOponent, rival.attack, `// x${punch} //=>`, Type, pokemon.deffence, pokemon.actualHealdToCero, pokemon.hp)

            if (pokemon.actualHealdToCero >= heald) {
                pokemon.heald = 0;
            }
            //?................................................................................................
        } else {
            //*................................................................................................
            console.log(typePokemon, typeRival);


            if (variables.PokemonStrengthsTypes[typePokemon||"normal"]?.weaknesses.includes(typeRival||"normal")||false) {
                scaleAttack = 0.25;
            }

            if (variables.PokemonStrengthsTypes[typePokemon||"normal"]?.strengths.includes(typeRival||"normal")||false) {
                scaleAttack = 1;
            }

            let perfectBlock = Math.random();

            if (perfectBlock > 0.8) {
                attack = 1
            } else {
                attack = Math.round((scaleAttack * (functions.showStat(rival, variables.stadistic[7][0]) * Math.random()) + (functions.showStat(rival, variables.stadistic[7][0]))));
            }

            let defense = functions.showStat(pokemon, variables.stadistic[9][0])

            let punch = attack - defense

            if (punch <= 10) {
                punch = 10;
            }

            let heald = functions.showStat(pokemon, variables.stadistic[1][0])

            if (pokemon.actualHealdToCero === undefined || pokemon.actualHealdToCero === NaN) {
                pokemon.actualHealdToCero = 0;
            }

            pokemon.actualHealdToCero = pokemon.actualHealdToCero + punch

            console.log("__heald__Special", flag,
                heald,
                punch,
                pokemon.actualHealdToCero

            )

            pokemon.actualHealdToCero = pokemon.actualHealdToCero + punch

            // console.log(`//=>`, flag, TypeOponent, rival.attack, `// x${punch} //=>`, Type, pokemon.deffence, pokemon.actualHealdToCero, pokemon.hp)

            if (pokemon.actualHealdToCero >= heald) {
                pokemon.heald = 0;
            }
        }

        //*................................................................................................

    },

    //*BattlePokemon.................................................................................................................

    //!BattlePokemon.................................................................................................................
    battlePokemon: (battle, campTotalState) => {
        console.log("InitBattlePokemon.....", battle)
        const stadium = battle.stadium;
        const uPokemon = battle.uPokemon;
        const rivalPokemon = battle.rivalPokemon;
        const $rivalPokemon = document.getElementById("pokemon-rival-inbattle");
        const $rivalPokemonImg = document.getElementById("rivalPokemonImg");
        const $uPokemon = document.getElementById("pokemon-user-inbattle");
        const $uPokemonImg = document.getElementById("userPokemonImg");
        const $stadium = document.getElementById("battleField-stadium");


        const moveUPokemon = functionsBattle.movePokemon(uPokemon, $uPokemon, $stadium, "uPokemon");
        const moveRivalPokemon = functionsBattle.movePokemon(rivalPokemon, $rivalPokemon, $stadium, "rivalPokemon");




        //console.log("uPokemon", moveUPokemon);
        //console.log("RivalPokemon", moveRivalPokemon);
        uPokemon.positionX = moveUPokemon[0];
        uPokemon.positionY = moveUPokemon[1];
        uPokemon.rotation = moveUPokemon[2];
        if (uPokemon.rotation >= 360) {
            uPokemon.rotation = uPokemon.rotation - 360;
            //console.log("change", uPokemon.rotation);
        }
        if (uPokemon.rotation <= 0) {
            uPokemon.rotation = uPokemon.rotation + 360;
            //console.log("change", uPokemon.rotation);
        }


        //uPokemon.direction=[moveUPokemon[3],moveUPokemon[4]]
        uPokemon.direction[0] = moveUPokemon[3];
        uPokemon.direction[1] = moveUPokemon[4];
        uPokemon.speedX = moveUPokemon[5];
        uPokemon.speedY = moveUPokemon[6];

        rivalPokemon.positionX = moveRivalPokemon[0];
        rivalPokemon.positionY = moveRivalPokemon[1];
        rivalPokemon.rotation = moveRivalPokemon[2];
        if (rivalPokemon.rotation > 360) {
            rivalPokemon.rotation = rivalPokemon.rotation - 360;
            console.log("change", rivalPokemon.rotation);
        }
        if (rivalPokemon.rotation <= 0) {
            rivalPokemon.rotation = rivalPokemon.rotation + 360;
            console.log("change", rivalPokemon.rotation);
        }


        //rivalPokemon.direction=[moveRivalPokemon[3],moveRivalPokemon[4]]
        rivalPokemon.direction[0] = moveRivalPokemon[3];
        rivalPokemon.direction[1] = moveRivalPokemon[4];
        rivalPokemon.speedX = moveRivalPokemon[5];
        rivalPokemon.speedY = moveRivalPokemon[6];

        //console.log("assingature", moveRivalPokemon)

        if ($rivalPokemon !== undefined && $rivalPokemon !== null || $uPokemon !== undefined && $uPokemon !== null) {

            const limitRivalPokemon = $rivalPokemon.getBoundingClientRect();
            const limitUPokemon = $uPokemon.getBoundingClientRect();
            const limitStadium = $stadium.getBoundingClientRect();
            const fractionStadiumX = limitStadium.width / 1000;
            const fractionStadiumY = limitStadium.height / 1000;
            //console.log("LIMI STADIUM: ", limitStadium);


            $rivalPokemon.style.transform = `translate(${moveRivalPokemon[0] * fractionStadiumX}px,${moveRivalPokemon[1] * fractionStadiumY}px) rotate(${moveRivalPokemon[2] || rivalPokemon.rotation}deg)`;
            $rivalPokemonImg.style.transform = `rotate(${-1 * (moveRivalPokemon[2] || rivalPokemon.rotation)}deg)`;



            $uPokemon.style.transform = `translate(${moveUPokemon[0] * fractionStadiumX}px,${moveUPokemon[1] * fractionStadiumY}px) rotate(${moveUPokemon[2] || uPokemon.rotation}deg)`;
            $uPokemonImg.style.transform = `rotate(${-1 * (moveUPokemon[2] || uPokemon.rotation)}deg)`;
        }

        const newBattle = { ...battle, uPokemon, rivalPokemon }

        const otherBattle = functionsBattle.phasePunck(newBattle);
        //!0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000vamos Aqui
        //!000 El estado esta Cambiando y entra en cnflicto Al intentar cambiar el estado local , se debe intentar el mismo proceso pero en vez de usar u estado local se debe implementar en el local

        //console.log("otherBattle..........", otherBattle);
        return otherBattle;
    },

    //!MovePokemon.................................................................................................................
    movePokemon: (pokemon, locationPokemon, locationStadium, flag) => {

        //console.log("movePokemon__ pokemon",pokemon)        
        const _locationPokemon = locationPokemon.getBoundingClientRect();
        const _locationStadium = locationStadium.getBoundingClientRect();
        //const _locationStadium=locationStadium;
        if (_locationStadium.left !== undefined) {

            //console.log("POKEMON LOCATION",_locationPokemon)
            const reductionSpeed = 1;
            //*Locations - stadium
            const stadiumLeft = _locationStadium.left;
            const stadiumRight = _locationStadium.right;
            const stadiumTop = _locationStadium.top;
            const stadiumBottom = _locationStadium.bottom;
            //*Locations - pokemon
            const pokemonLeft = _locationPokemon.left;
            const pokemonRight = _locationPokemon.right;
            const pokemonTop = _locationPokemon.top;
            const pokemonBottom = _locationPokemon.bottom;




            //const parameter = [pokemon.rotation + ((0.1 + parseInt(pokemon.speed * pokemon.direction[2]) / 2))]
            const directionX = pokemon.direction[0]
            const directionY = pokemon.direction[1]
            const rotation = pokemon.rotation + ((0.1 + parseInt(pokemon.speed * pokemon.direction[2]) / 2))
            const longMoveX = (1 + parseInt(pokemon.speedX * pokemon.direction[3])) / 6
            const longMoveY = (1 + parseInt(pokemon.speedY * pokemon.direction[4])) / 6
            //console.log("i.i", longMoveY)

            let direction = "R-U";
            if (directionX === "+" && directionY === "+") {
                direction = "R-D";
            } else
                if (directionX === "-" && directionY === "+") {
                    direction = "L-D";
                } else
                    if (directionX === "-" && directionY === "-") {
                        direction = "L-U";
                    }

            //console.log("speedXY", longMoveX, longMoveY, pokemon.direction[3], pokemon.direction[4], pokemon.speed)



            switch (direction) {
                case "R-U":
                    //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                    pokemon.positionX = pokemon.positionX + longMoveX;
                    pokemon.positionY = pokemon.positionY - longMoveY;
                    //console.log(flag, "Y R-U:", pokemonTop - longMoveY, stadiumTop, pokemonTop - longMoveY <= stadiumTop);
                    //console.log(flag, "X R-U:", pokemonRight + longMoveX, stadiumRight, pokemonRight + longMoveX >= stadiumRight);
                    if (pokemonTop - longMoveY <= stadiumTop) {
                        pokemon.direction[1] = "+";
                        const limits = functionsBattle.limitStadium(pokemon.speed)
                        pokemon.speedX = limits[0] / reductionSpeed;
                        pokemon.speedY = limits[1] / reductionSpeed;
                        pokemon.rotation = limits[2];
                    }
                    if (pokemonRight + longMoveX >= stadiumRight) {
                        pokemon.direction[0] = "-";
                        const limits = functionsBattle.limitStadium(pokemon.speed)
                        pokemon.speedX = limits[0] / reductionSpeed;
                        pokemon.speedY = limits[1] / reductionSpeed;
                        pokemon.rotation = limits[2];
                    }

                    //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                    break;
                case "R-D":
                    //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)

                    pokemon.positionX = (pokemon.positionX + longMoveX);
                    pokemon.positionY = pokemon.positionY + longMoveY;
                    //console.log(flag, "Y R-D:", pokemonBottom + longMoveY, stadiumBottom, pokemonBottom + longMoveY >= stadiumBottom);
                    //console.log(flag, "X R-D:", pokemonRight + longMoveX, stadiumRight, pokemonRight + longMoveX >= stadiumRight);
                    if (pokemonBottom + longMoveY >= stadiumBottom) {
                        pokemon.direction[1] = "-";
                        const limits = functionsBattle.limitStadium(pokemon.speed)
                        pokemon.speedX = limits[0] / reductionSpeed;
                        pokemon.speedY = limits[1] / reductionSpeed;
                        pokemon.rotation = limits[2];
                    }
                    if (pokemonRight + longMoveX >= stadiumRight) {
                        pokemon.direction[0] = "-";
                        const limits = functionsBattle.limitStadium(pokemon.speed)
                        pokemon.speedX = limits[0] / reductionSpeed;
                        pokemon.speedY = limits[1] / reductionSpeed;
                        pokemon.rotation = limits[2];
                    }

                    //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                    break;
                case "L-U":
                    pokemon.positionX = pokemon.positionX - longMoveX;
                    pokemon.positionY = pokemon.positionY - longMoveY;
                    //console.log(flag, "Y L-U:", pokemonTop - longMoveY, stadiumTop, pokemonTop - longMoveY <= stadiumTop);
                    //console.log(flag, "X L-U:", pokemonLeft - longMoveX, stadiumLeft, pokemonLeft - longMoveX <= stadiumLeft);

                    if (pokemonTop - longMoveY <= stadiumTop) {
                        pokemon.direction[1] = "+";
                        const limits = functionsBattle.limitStadium(pokemon.speed)
                        pokemon.speedX = limits[0] / reductionSpeed;
                        pokemon.speedY = limits[1] / reductionSpeed;
                        pokemon.rotation = limits[2];
                    }
                    if (pokemonLeft - longMoveX <= stadiumLeft) {
                        pokemon.direction[0] = "+";
                        const limits = functionsBattle.limitStadium(pokemon.speed)
                        pokemon.speedX = limits[0] / reductionSpeed;
                        pokemon.speedY = limits[1] / reductionSpeed;
                        pokemon.rotation = limits[2];
                    }
                    //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                    break;
                case "L-D":
                    //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                    pokemon.positionX = pokemon.positionX - longMoveX;
                    pokemon.positionY = pokemon.positionY + longMoveY;
                    //console.log(flag, "Y L-D:", pokemonBottom + longMoveY, stadiumBottom, pokemonBottom + longMoveY >= stadiumBottom);
                    //console.log(flag, "X L-U:", pokemonLeft - longMoveX, stadiumLeft, pokemonLeft - longMoveX <= stadiumLeft);

                    if (pokemonBottom + longMoveY >= stadiumBottom) {
                        pokemon.direction[1] = "-";
                        const limits = functionsBattle.limitStadium(pokemon.speed)
                        pokemon.speedX = limits[0] / reductionSpeed;
                        pokemon.speedY = limits[1] / reductionSpeed;
                        pokemon.rotation = limits[2];
                    }
                    if (pokemonLeft - longMoveX <= stadiumLeft) {
                        pokemon.direction[0] = "+";
                        const limits = functionsBattle.limitStadium(pokemon.speed)
                        pokemon.speedX = limits[0] / reductionSpeed;
                        pokemon.speedY = limits[1] / reductionSpeed;
                        pokemon.rotation = limits[2];
                    }
                    //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                    break;
            }
            //console.log(pokemon)
            //console.log(flag,pokemon.direction)


            //console.log("move:_positionX_",flag, pokemon.positionX);
            //console.log("move:_positionY_",flag, pokemon.positionY);
            //console.log("move:_rotation_",flag, rotation);
            //console.log("move:_directionX_",flag, pokemon.direction[0]);
            //console.log("move:_directionY_",flag, pokemon.direction[1]);
            //console.log([pokemon.positionX, pokemon.positionY, rotation, pokemon.direction[0], pokemon.direction[1]])
            //console.log(pokemon)
            return [pokemon.positionX, pokemon.positionY, rotation, pokemon.direction[0], pokemon.direction[1], pokemon.speedX, pokemon.speedY];
        } else {
            console.log("warning....");
            console.log(".........", pokemon, locationPokemon, locationStadium, flag);
            return [pokemon.positionX, pokemon.positionY, pokemon.rotation, pokemon.direction[0], pokemon.direction[1], pokemon.speedX, pokemon.speedY];
        }


    },
    limitStadium: (speed) => {
        const direction = []
        const speedX = (4 * Math.random()) + Math.round(Math.random() * speed * 2);
        const speedY = (4 * Math.random()) + Math.round(Math.random() * speed * 2);
        const rotation = Math.random();
        direction.push(speedX, speedY)
        if (rotation >= 0.5) {
            direction.push(0.8 + (rotation * speed / 1));
        } else {
            direction.push(-1 * (0.8 + (rotation * speed / 1)));
        }
        console.log("DIRECTION !!!!!!!!!!!!!!!!!!!!!!!!!!!!! ", direction)
        return direction;
    },

    //!phasePunch
    phasePunck: (battle) => {


        battle.rivalPokemon = functionsBattle.collisionCheck("rival", "user", battle.rivalPokemon, "", battle.uPokemon);
        battle.uPokemon = functionsBattle.collisionCheck("user", "rival", battle.uPokemon, "", battle.rivalPokemon);
        battle.rivalPokemon = functionsBattle.collisionCheck("rival", "object", battle.rivalPokemon, "obstacule1",);
        battle.uPokemon = functionsBattle.collisionCheck("user", "object", battle.uPokemon, "obstacule1",);





        return battle;
    },
    collisionCheck: (flag, rival, pokemon, obstaculoId = "", dataRival) => {

        if (pokemon !== undefined) {

            //console.log("COLLISION init: ", flag,rival);
            let $rivalPokemon = document.getElementById("pokemon-rival-inbattle");
            let $uPokemon = document.getElementById("pokemon-user-inbattle");




            //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", pokemon,flag)

            if (flag === "rival" && rival === "user") {
                $rivalPokemon = document.getElementById("pokemon-user-inbattle");
                $uPokemon = document.getElementById("pokemon-rival-inbattle");
            }
            if (flag === "user" && rival === "rival") {
                $rivalPokemon = document.getElementById("pokemon-rival-inbattle");
                $uPokemon = document.getElementById("pokemon-user-inbattle");
            }
            if (flag === "rival" && rival === "object") {
                $rivalPokemon = document.getElementById(`${obstaculoId}`);
                $uPokemon = document.getElementById("pokemon-rival-inbattle");
            }
            if (flag === "user" && rival === "object") {
                $rivalPokemon = document.getElementById(`${obstaculoId}`);
                $uPokemon = document.getElementById("pokemon-user-inbattle");
            }

            let locationPokemon = $uPokemon.getBoundingClientRect();
            let locationRivalPokemon = $rivalPokemon.getBoundingClientRect();

            //console.log("................", flag, ".................", locationPokemon.bottom - locationPokemon.top, locationPokemon)
            let pointsPokemon = {
                LB: {
                    x: locationPokemon.left,
                    y: locationPokemon.bottom,
                },
                LT: {
                    x: locationPokemon.left,
                    y: locationPokemon.top,
                },
                RB: {
                    x: locationPokemon.right,
                    y: locationPokemon.bottom,
                },
                RT: {
                    x: locationPokemon.right,
                    y: locationPokemon.top,
                },
            };

            //! colisionRival
            if (
                pointsPokemon.LB.x > locationRivalPokemon.left &&
                pointsPokemon.LB.x < locationRivalPokemon.right &&
                pointsPokemon.LB.y > locationRivalPokemon.top &&
                pointsPokemon.LB.y < locationRivalPokemon.bottom
                ||
                pointsPokemon.LT.x > locationRivalPokemon.left &&
                pointsPokemon.LT.x < locationRivalPokemon.right &&
                pointsPokemon.LT.y > locationRivalPokemon.top &&
                pointsPokemon.LT.y < locationRivalPokemon.bottom
            ) {

                if (rival !== "object") {
                    functionsBattle.collision(pokemon, flag, dataRival);
                }
                pokemon.direction[0] = "+";

            };
            if (
                pointsPokemon.LT.y > locationRivalPokemon.top &&
                pointsPokemon.LT.y < locationRivalPokemon.bottom &&
                pointsPokemon.LT.x > locationRivalPokemon.left &&
                pointsPokemon.LT.x < locationRivalPokemon.right
                ||
                pointsPokemon.RT.y > locationRivalPokemon.top &&
                pointsPokemon.RT.y < locationRivalPokemon.bottom &&
                pointsPokemon.RT.x > locationRivalPokemon.left &&
                pointsPokemon.RT.x < locationRivalPokemon.right
            ) {
                if (rival !== "object") {
                    functionsBattle.collision(pokemon, flag, dataRival);
                }
                pokemon.direction[1] = "+";
            };
            if (
                pointsPokemon.RB.x < locationRivalPokemon.right &&
                pointsPokemon.RB.x > locationRivalPokemon.left &&
                pointsPokemon.RB.y > locationRivalPokemon.top &&
                pointsPokemon.RB.y < locationRivalPokemon.bottom
                ||
                pointsPokemon.RT.x < locationRivalPokemon.right &&
                pointsPokemon.RT.x > locationRivalPokemon.left &&
                pointsPokemon.RT.y > locationRivalPokemon.top &&
                pointsPokemon.RT.y < locationRivalPokemon.bottom
            ) {
                if (rival !== "object") {
                    functionsBattle.collision(pokemon, flag, dataRival);
                }
                pokemon.direction[0] = "-";
            };
            if (
                pointsPokemon.LB.y < locationRivalPokemon.bottom &&
                pointsPokemon.LB.y > locationRivalPokemon.top &&
                pointsPokemon.LB.x < locationRivalPokemon.left &&
                pointsPokemon.LB.x > locationRivalPokemon.right
                ||
                pointsPokemon.RB.y < locationRivalPokemon.bottom &&
                pointsPokemon.RB.y > locationRivalPokemon.top &&
                pointsPokemon.RB.x > locationRivalPokemon.left &&
                pointsPokemon.RB.x < locationRivalPokemon.right

            ) {
                if (rival !== "object") {
                    functionsBattle.collision(pokemon, flag, dataRival);
                }
                pokemon.direction[1] = "-";
            };



        }
        return pokemon;
    },
    collision: (pokemon, flag, rival) => {

        let rotation = pokemon.rotation




        let Type = pokemon.types[0];
        let TypeOponent = rival.types[0];

        if (pokemon.rotation > 180 && pokemon.rotation <= 270) {
            if (pokemon.types.length > 1) {
                Type = pokemon.types[1];
            } else {
                Type = pokemon.types[0];
            }
        }
        if (rival.rotation > 180 && rival.rotation <= 270) {
            if (rival.types.length > 1) {
                TypeOponent = rival.types[1];
            } else {
                TypeOponent = rival.types[0];
            }
        }

        let scaleAttack = 1;

        console.log(Type, TypeOponent);

        if (variables.PokemonStrengthsTypes[Type].weaknesses.includes(TypeOponent)) {
            scaleAttack = 0.5;
        }

        if (variables.PokemonStrengthsTypes[Type].strengths.includes(TypeOponent)) {
            scaleAttack = 2;
        }


        scaleAttack = Math.round(scaleAttack * (rival.attack * Math.random()) + rival.attack / 2);

        let punch = scaleAttack - pokemon.deffence

        if (punch <= 0) {
            punch = 0;
        }

        pokemon.actualHealdToCero = pokemon.actualHealdToCero + punch

        console.log(`//=>`, flag, TypeOponent, rival.attack, `// x${punch} //=>`, Type, pokemon.deffence, pokemon.actualHealdToCero, pokemon.hp)

        if (pokemon.actualHealdToCero >= pokemon.hp) {
            pokemon.life = false;
        }


    }



}

