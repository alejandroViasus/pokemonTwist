const d = document;
const { variables, functions } = require("../../../assets/variables");

export const functionsBattle = {

    getStartDiretion: (speed) => {
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


        return direction;
    },

    battlePokemon: (battle) => {
        console.log(battle)
        const stadium = battle.stadium;
        const uPokemon = battle.uPokemon;
        const rivalPokemon = battle.rivalPokemon;
        const $rivalPokemon = document.getElementById("pokemon-rival-inbattle");
        const $uPokemon = document.getElementById("pokemon-user-inbattle");
        const $stadium = document.getElementById("battleField-stadium");


        const moveUPokemon = functionsBattle.movePokemon(uPokemon,$uPokemon,$stadium, "uPokemon");
        const moveRivalPokemon = functionsBattle.movePokemon(rivalPokemon,$uPokemon,$stadium,"rivalPokemon");
        

        uPokemon.positionX = moveUPokemon[0];
        uPokemon.positionY = moveUPokemon[1];
        uPokemon.rotation = moveUPokemon[2];

        rivalPokemon.positionX = moveRivalPokemon[0];
        rivalPokemon.positionY = moveRivalPokemon[1];
        rivalPokemon.rotation = moveRivalPokemon[2];

        if ($rivalPokemon !== undefined && $rivalPokemon !== null || $uPokemon !== undefined && $uPokemon !== null) {

            const limitRivalPokemon = $rivalPokemon.getBoundingClientRect();
            const limitUPokemon = $uPokemon.getBoundingClientRect();
            const limitStadium = $stadium.getBoundingClientRect();
            const fractionStadiumX=limitStadium.width/1000;
            const fractionStadiumY=limitStadium.height/1000;
            console.log("LIMI STADIUM: ", limitStadium);


            $rivalPokemon.style.transform = `translate(${moveRivalPokemon[0]}px,${moveRivalPokemon[1]}px)`;
            $uPokemon.style.transform = `translate(${moveUPokemon[0]*fractionStadiumX}px,${moveUPokemon[1]*fractionStadiumY}px)`;
        }

        return { ...battle, uPokemon, rivalPokemon }
    },


    movePokemon: (pokemon,locationPokemon,locationStadium,flag) => {

        //!Locations - stadium
        const stadiumLeft=locationStadium.left;
        const stadiumRight=locationStadium.right;
        const stadiumTop=locationStadium.top;
        const stadiumBottom=locationStadium.bottom;
        //!Locations - pokemon
        const pokemionLeft=locationPokemon.left;
        const pokemonRight=locationPokemon.right;
        const pokemonTop=locationPokemon.top;
        const pokemonBottom=locationPokemon.bottom;

        //! ESTAMOS dISEÑANDO EL CONDICIONAL DE COLICION PARA EL STADIUM
        
        const directionX = pokemon.direction[0]
        const directionY = pokemon.direction[1]
        const rotation = pokemon.rotation + ((0.1 + parseInt(pokemon.speed * pokemon.direction[2]) / 2))
        const longMoveX = (1 + parseInt(pokemon.speed * pokemon.direction[3])) / 2
        const longMoveY = (1 + parseInt(pokemon.speed * pokemon.direction[4])) / 2

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
                const nextMoveX=pokemon.positionX+longMoveX;
                const nextMoveY=pokemon.positionY+longMoveY;

                //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                break;
            case "R-D":
                //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)

                pokemon.positionX = pokemon.positionX + longMoveX;
                pokemon.positionY = pokemon.positionY + longMoveY;
                //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                break;
            case "L-U":
                //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                pokemon.positionX = pokemon.positionX - longMoveX;
                pokemon.positionY = pokemon.positionY - longMoveY;
                //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                break;
            case "L-D":
                //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                pokemon.positionX = pokemon.positionX - longMoveX;
                pokemon.positionY = pokemon.positionY + longMoveY;
                //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                break;
        }
        //console.log(pokemon)
        //console.log(flag,pokemon.direction)
        
        
        console.log("move:__", [pokemon.positionX, pokemon.positionY], pokemon.direction, flag);
        return [pokemon.positionX, pokemon.positionY, rotation];
    }
}

