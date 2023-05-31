const d = document;
const { variables, functions } = require("../../../assets/variables");

export const functionsBattle = {
    getStartDiretion: (speed) => {
        const directionX = Math.random();
        const directionY = Math.random();
        const speedX = Math.round(Math.random() * speed);
        const speedY = Math.round(Math.random() * speed);
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
        }
        direction.push(speedX, speedY);


        return direction;
    },
    movePokemon: (pokemon, flag) => {

        const directionX = pokemon.direction[0]
        const directionY = pokemon.direction[1]
        const longMoveX = (1 + parseInt(pokemon.speed*pokemon.direction[2]))/2
        const longMoveY = (1 + parseInt(pokemon.speed*pokemon.direction[3]))/2

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

        console.log("speedXY", longMoveX, longMoveY,pokemon.direction[2],pokemon.direction[3],pokemon.speed)



        switch (direction) {
            case "R-U":
                //console.log(flag,"x:",directionX, pokemon.positionX,"y: ",directionY,pokemon.positionY)
                pokemon.positionX = pokemon.positionX + longMoveX;
                pokemon.positionY = pokemon.positionY - longMoveY;
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
        return [pokemon.positionX, pokemon.positionX];
    }
}

