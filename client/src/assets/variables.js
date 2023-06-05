

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
const day = today.getDate();



export const dataBaseImages = {

    official: {
        default: (namePokemon) => {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${namePokemon}.png`;
        },
        shiny: (namePokemon) => {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${namePokemon}.png` || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${namePokemon}.png`;
        },
    },

    model3D: {
        default: (namePokemon) => {
            return `https://img.pokemondb.net/sprites/home/normal/2x/${namePokemon}.jpg`
        },
        shiny: (namePokemon) => {
            return `https://img.pokemondb.net/sprites/home/shiny/2x/${namePokemon}.jpg`
        }
    },

    sprites: {
        back_default: (noPokedex) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${noPokedex}.png`,
        back_female: (noPokedex) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/${noPokedex}.png`,
        back_shiny: (noPokedex) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${noPokedex}.png`,
        back_shiny_female: (noPokedex) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/${noPokedex}.png`,
        front_default: (noPokedex) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${noPokedex}.png`,
        front_female: (noPokedex) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/${noPokedex}.png`,
        front_shiny: (noPokedex) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${noPokedex}.png`,
        front_shiny_female: (noPokedex) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/${noPokedex}.png`,

    },

    icon: {
        default: (noPokedex) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${noPokedex}.png`
    },

    dreamWorld: {
        default: (noPokedex) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${noPokedex}.svg`
    }

}

export const functions = {
    fetchPokemon: (noPokedex) => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${noPokedex}`)
            .then(response => response.json())
            .then(data => {
                //console.log(`POKEMON SELECT ${data.name}`, data);
                return data;
            })
    },
    getRarity: (user) => {
        const value = Math.random();
        const rarity = variables.percentageRarity;
        const addedUserCount = user.level / 400
        let returnRarity = Object.keys(rarity)[0];
        Object.keys(rarity).map((rare) => {
            // console.log(rarity[rare], rare)
            //console.log(rare)
            if ((value + addedUserCount) > rarity[rare][0]) {
                return rare
            }
        })

        return returnRarity;
    },

    getShiny: () => {
        const value = Math.random();
        //console.log("_______________", value, variables.percentageShiny, value > variables.percentageShiny);
        if (value > variables.percentageShiny) {
            return true
        } else { return false }
    },
    getGenre: () => {
        const value = Math.random();
        if (value > 0.5) return 1
        else return 0
    },

    getLevelPokemon: (user) => {
        const value = Math.random();
        const rarity = variables.percentageRarity;
        const addedUserCount = user.level / 100;
        let returnRarity = Object.keys(rarity)[0];

        Object.keys(rarity).map((rare) => {
            //console.log(rarity[rare], rare)
            if ((value + addedUserCount) > rarity[rare][0]) {
                returnRarity = rare;
            }
        })
        const level = Math.ceil(1 + (Math.random() * rarity[returnRarity][1]) + 1);
        //console.log("level: ", level);
        return level;
    },

    getNoPokedex: () => {
        let number = Math.floor((Math.random() * variables.sizePokedex[1]) + variables.sizePokedex[0]);
        //console.log("number", number)
        if (variables.cautionPokemons.includes(number)) {
            console.log(`cautionPokemon!!! ---------- o.O , ${number}`);
            return functions.getNoPokedex();
        } else {
            return number;
        }

    },

    getStats: async (database) => {
        const hp = database.stats[0].base_stat.toString();
        const attack = database.stats[1].base_stat.toString();
        const defense = database.stats[2].base_stat.toString();
        const specialAttack = database.stats[3].base_stat.toString();
        const specialDefense = database.stats[4].base_stat.toString();
        const speed = database.stats[5].base_stat.toString();

        return `${hp},${attack},${defense},${specialAttack},${specialDefense},${speed}`;
    },
    getEffort: async (database) => {
        const hp = database.stats[0].effort.toString();
        const attack = database.stats[1].effort.toString();
        const defense = database.stats[2].effort.toString();
        const specialAttack = database.stats[3].effort.toString();
        const specialDefense = database.stats[4].effort.toString();
        const speed = database.stats[5].effort.toString();

        return `${hp},${attack},${defense},${specialAttack},${specialDefense},${speed}`;
    },
    getTypes: async (database) => {
        let types = "";
        database.types.map((modelType) => {
            let type = modelType.type.name
            variables.types.map((principalType, index) => {
                // console.log("typess..........", type, principalType)
                if (type === principalType) {
                    if (types === "") {
                        types = types + index.toString();
                    } else {
                        types = types + "," + index.toString();
                    }
                }
            })

        });
        return types;

    },
    getScale: async (rarity) => {
        if (rarity !== undefined) {
            let scale = "";
            for (let i = 0; i < 6; i++) {
                //console.log (i,rarity)
                if (i === 0) {
                    scale = scale + Math.round(Math.random() * variables.percentageRarity[rarity][2]);
                } else {

                    scale = scale + "," + Math.round(Math.random() * variables.percentageRarity[rarity][2]);
                }
            }
            return scale;
        }
    },

    getPokemon: async (trainer, database, levelPokemon, rarity, shiny, genre, indexPokemon) => {
        return {
            genre: await genre,
            shiny: await shiny,
            noPokedex: database.id,
            name: await database.name,
            height: await database.height,
            weight: await database.weight,
            trainer: await trainer.email,
            team: false,
            favorite: false,
            new: true,
            auction: false,
            scale: await functions.getScale(rarity) || "1,1,1,1,1,1,1",
            stats: await functions.getStats(database),
            effort: await functions.getEffort(database),
            maxStack4level: 10 * (levelPokemon * 2) || 0,
            actualStack: 0,
            heald: 100,
            level: await levelPokemon,
            types: await functions.getTypes(database),
            indexPokemon
        }
    },

    createPokemon: async () => {
        try {
            const noPokedex = functions.getNoPokedex();
            let databasePokemon = {};
            console.log("noPokedex", noPokedex)

            const data = await functions.getPokemon(noPokedex);
            if (data) {
                databasePokemon = data;
            } else {
                console.log("Error: No se pudo obtener el Pokémon.");
            }

            console.log("data", data);
            return databasePokemon;
        } catch (error) {
            console.log(error);
        }
    },

    generatePokemon: async (trainer, database, levelPokemon, rarity, shiny, genre) => {
        const newPokemon = await functions.getPokemon(trainer, database, levelPokemon, rarity, shiny, genre);

        console.log(`0....0`, newPokemon);


        fetch(`http://localhost:9000/api/pokemon`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPokemon),
        })
            .then((response) => response.json())
            .then((data) => {
                //console.log('Response:', data);
            })
            .catch((error) => {
                //console.error('Error:', error);
            });
    },
    updatePokemon: async (updatePokemon) => {
        console.log(`0....0`, updatePokemon);

        fetch(`http://localhost:9000/api/pokemons/${updatePokemon._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatePokemon),
        })
            .then((response) => response.json())
            .then((data) => {
                //console.log('Response:', data);
            })
            .catch((error) => {
                //console.error('Error:', error);
            });
    },
    getEvolution: async (noPokedex) => {
        fetch(`https://pokeapi.co/api/v2/evolution-chain/${noPokedex}`)
            .then(response => response.json())
            .then(data => console.log("...................DATA...........................", data.chain.evolves_to))
    },

    showTypes: (types) => {
        const arrayTypes = [];
        types.split(",").map((type) => {
            arrayTypes.push(variables.types[type])
        })
        return (arrayTypes)
    },

    showStat: (Pokemon, stat) => {
        let indexStat = ""
        variables.stadistic.map((stadistic, index) => {
            if (stat === stadistic[0]) {
                //console.log(`ShowStat`,stat);
                indexStat = stadistic[1];
            }
        })
        if (indexStat !== "") {

            const baseStats = Pokemon.stats.split(",");
            const scaleStats = Pokemon.scale.split(",");
            const effortStats = Pokemon.effort.split(",");
            const level = Pokemon.level;
            //onsole.log(Pokemon.name, baseStats,scaleStats,effortStats, baseStats[indexStat],scaleStats[indexStat],effortStats[indexStat],level,stat);

            if (indexStat == 6) {
                //console.log(scaleStats,Pokemon.name)
                let totalStat = 0;
                scaleStats.map((scale) => {
                    if (scale >= 1) {
                        totalStat = totalStat + parseInt(scale);
                    }
                })
                //console.log(totalStat,Pokemon.name)
                return totalStat;
            } else if (indexStat == 7) {
                let totalStat = Pokemon.level;
                return totalStat
            } else if (indexStat == 0) {
                let totalStat = 20 * (parseInt(baseStats[indexStat] * 1.3) + parseInt(scaleStats[indexStat] * 3) + parseInt(effortStats[indexStat] * 2) + parseInt((level + 1) * 1.3));
                //console.log( Pokemon.name, totalStat);
                return totalStat;
            } else if (indexStat == 5) {

                let totalStat = (parseInt(baseStats[indexStat]) + parseInt(scaleStats[indexStat]) + parseInt(effortStats[indexStat]) + parseInt((level + 1))) / 15;
                //console.log( Pokemon.name, totalStat);
                return totalStat;

            } else {

                let totalStat = (parseInt(baseStats[indexStat] * 0.4) + parseInt(scaleStats[indexStat] * 2) + parseInt(effortStats[indexStat] * 1) + parseInt((level + 1) * 0.6));
                //console.log( Pokemon.name, totalStat);
                return totalStat;

            }
        }
        // arrayPokemons.sort((pokemon,pokemonNext)=>{
        // })

    },
    //!comporbar 
    getPokepomWhitSpecificType: () => {
        function getPokemonByType(pokemonType) {
            const apiUrl = `https://pokeapi.co/api/v2/type/${pokemonType.toLowerCase()}`;

            return fetch(apiUrl)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(`Error al obtener los Pokémon de tipo ${pokemonType}`);
                    }
                })
                .then(data => {
                    const pokemonSpecies = data.pokemon;
                    const randomPokemon = pokemonSpecies[Math.floor(Math.random() * pokemonSpecies.length)].pokemon.name;
                    return randomPokemon;
                });
        }

        // Ejemplo de uso
        const pokemonType = 'fire';  // Reemplaza 'fire' por el tipo de Pokémon que desees
        getPokemonByType(pokemonType)
            .then(randomPokemon => {
                console.log(`Un Pokémon de tipo ${pokemonType}: ${randomPokemon}`);
            })
            .catch(error => {
                console.error(error);
            });
    },

    getRivalPokemon: (rival, noPokedex = 1, Database) => {
        const levelPokemon = functions.getLevelPokemon(rival);
        const rarity = functions.getRarity(rival);
        const shiny = functions.getShiny();
        const genre = functions.getGenre();

        //console.log("pokemonRival___ppp", rival, Database, levelPokemon, rarity, shiny, genre)
        const pokemon = functions.getPokemon(rival, Database, levelPokemon, rarity, shiny, genre);
        //console.log("PokemonRival: ", pokemon)
        return pokemon;
    },

    getRival: async (user) => {
        //console.log("user 4 rival", user);
        let gametag = Math.round((Math.random() * variables.trainersRivals.length) - 1);
        if (gametag <= 0) {
            gametag = 0;
        }

        const rival = {
            ...user,
            pictureTrainer: gametag,
            level: Math.round(Math.random() * (user.level + (user.league * 3) + 5) + user.level),
            gametag: gametag,
            email: "rival." + user.email
        };
        // const dataTeam = [
        //     await functions.fetchPokemon(functions.getNoPokedex()),
        //     await functions.fetchPokemon(functions.getNoPokedex()),
        //     await functions.fetchPokemon(functions.getNoPokedex()),
        //     await functions.fetchPokemon(functions.getNoPokedex()),
        //     await functions.fetchPokemon(functions.getNoPokedex()),
        // ];

        //console.log(dataTeam)


        //const finalTeamRival=functions.makeTeam(rival,dataTeam);


        return rival;
    },

    makeTeam: async (user, team) => {
        const finalTeam = [];
        for (let i = 0; i < team.length; i++) {
            console.log("makeTeam", functions.getRivalPokemon(user, 1, team[i]))
            finalTeam.push((function (j) {
                return functions.getRivalPokemon(user, 1, team[j]);
            })(i));
        }
        console.log(finalTeam)

    },


    filtersCards: (cards, filters) => {
        //console.log("MASTER FILTER" , filters)
        let filterCards = cards;
        for (const key in filters) {
            if (filters[key] !== "" &&
                filters[key] !== "all" &&
                filters[key] !== false &&
                filters[key] !== undefined) {
                //console.log("!!!", key, filters[key])
                //console.log(cards[0])
                switch (key) {
                    case 'name': {
                        filterCards = filterCards.filter((card) => card.name.includes(filters[key]))
                        //console.log("filterName", filterCards);
                        break;
                    };
                    case `type1`: {
                        filterCards = filterCards.filter((card) => {
                            const splits = card.types.split(",");
                            //console.log("splits", splits, filters[key])
                            if (variables.types[splits[0]] === filters[key] || variables.types[splits[1]] === filters[key]) {
                                return true
                            }
                        })
                        break;
                    }
                    case `type2`: {
                        filterCards = filterCards.filter((card) => {
                            const splits = card.types.split(",");
                            //console.log("splits", splits, filters[key])
                            if (variables.types[splits[0]] === filters[key] || variables.types[splits[1]] === filters[key]) {
                                return true
                            }
                        })
                        break;
                    }
                    case `stadistic`: {
                        //console.log("FILTER KEY", filters[key], filters[key].includes("max to min"));
                        if (filters[key].includes("max to min")) {
                            filterCards = filterCards.sort((pokemon, pokemonNext) => {
                                if (functions.showStat(pokemon, filters[key]) < functions.showStat(pokemonNext, filters[key])) {
                                    return 1;
                                }
                                if (functions.showStat(pokemon, filters[key]) > functions.showStat(pokemonNext, filters[key])) {
                                    return -1;
                                }
                                return 0;
                            });
                        } else if (filters[key].includes("min to max")) {
                            filterCards = filterCards.sort((pokemon, pokemonNext) => {
                                if (functions.showStat(pokemon, filters[key]) > functions.showStat(pokemonNext, filters[key])) {
                                    return 1;
                                }
                                if (functions.showStat(pokemon, filters[key]) < functions.showStat(pokemonNext, filters[key])) {
                                    return -1;
                                }
                                return 0;
                            });
                        }
                        break;
                    }
                }


            }
        }
        return filterCards;
    },
    release: (data) => {
        let score = 0;
        //console.log(data);

        let scale = data.scale.split(",");
        //console.log(scale);

        scale.map((scaleValue) => {
            if (scaleValue >= 1) {
                //console.log("scale", scaleValue, score)
                score = score + (parseInt(scaleValue));
            }
        })
        score = score + (data.level * 1.2);

        if (variables.cautionPokemons.includes(data.nopokedex)) {
            console.log(`Respect Pokemon (${data.noPokedex}).`);
            score = score * 4;
        } else {
            //console.log(`Pokemon (${data.noPokedex}).`);
        }


        if (data.shiny == 1) {
            score = score * 2.5
        }
        //console.log(score);
        return [Math.round(score / 7), Math.round(score / 10), Math.round(score * 1.25)];

    },
    otherRival: async (globalState) => {
        //console.log("OtherRival", state)
        const rival = {
            ...globalState.you.user,
            email: `rival_${globalState.you.user.email}`,
            gametag: "Trainer Rival",
            level: Math.ceil(Math.random() * (1 + globalState.you.user.level)) * (globalState.you.user.level + 12),
            pictureTrainer: Math.round(Math.random() * variables.imagesTrainers.length)
        }
        const rarityRival = functions.getRarity(rival);

        const posiblesPokemons = [
            functions.getNoPokedex(),
            functions.getNoPokedex(),
            functions.getNoPokedex(),
            functions.getNoPokedex(),
            functions.getNoPokedex(),
            functions.getNoPokedex(),
          ];
    
        const fetchPokemonData = async () => {
            try {
                const responses = await Promise.all(posiblesPokemons.map(pokemon => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)));
                const pokemonData = await Promise.all(responses.map(response => response.json()));

                const otherState={...globalState}
                otherState.rival.user=rival;
                otherState.rival.team.dataPokemon=pokemonData;
                return otherState;
                // setState(prevState => ({
                //     ...prevState,
                //     rival: {
                //         rarity: rarityRival,
                //         ...prevState.rival,
                //         user: rival,
                //         team: {
                //             ...prevState.rival.team,
                //             dataPokemon: pokemonData,
                //         },
                //     },
                // }));
            } catch (error) {
                console.log(error);
            }
        };
        const newState = await fetchPokemonData();
        const basePokemon = [];
        newState.rival.team.dataPokemon?.map((pokemon) => {
            const base = {
                levelPokemon: functions.getLevelPokemon(newState.rival.user),
                noPokedex: pokemon.id,
                shiny: functions.getShiny(),
                genre: functions.getGenre(),
            }
            basePokemon.push(base);
        })
        newState.rival.team.basePokemon=basePokemon;
        const pokemons = [];
        for (let i = 0; i < newState.rival.team.basePokemon.length - 1; i++) {
          const basePokemon = newState.rival.team.basePokemon[i];
          const pokemon = await functions.getPokemon(
            newState.rival.user,
            newState.rival.team.dataPokemon[i],
            basePokemon.levelPokemon,
            newState.rival.rarity,
            basePokemon.shiny,
            basePokemon.genre,
            i
          );
          pokemons.push(pokemon);
        }

        const indexSelectorPokemon = Math.round(Math.random() * (pokemons.length - 1))
        const pokemonSelected = pokemons[indexSelectorPokemon]

        newState.rival.team.pokemons=pokemons
        newState.rival.team.selected=pokemonSelected;
        return newState
    }


}

export const variables = {
    initialState: {
        app: {
            loging: false,
            register: false,
            release: 0,
        },
        pokemon: {
            genre: 0,
            shiny: 0,
            noPokedex: 0,
            name: "",
            trainer: "",
            team: false,
            favorite: false,
            new: true,
            auction: false,
            scale: "0,0,0,0,0,0",
            stats: "0,0,0,0,0,0",
            effort: "0,0,0,0,0,0",
            heald: 100,
            maxStack4level: 60,
            actualStack: 0,
            level: 0,
            evolutions: "",
            types: "",
        },
        user: {
            version: "0.1",
            ban: false,
            email: "ejemplo@correo.com",
            gametag: "invitado",
            pictureTrainer: "0",
            experience: 0,
            tickets: 5,
            pokeballs: 50,
            bagPokemons: 30,
            coins: 1500,
            box: 5,
            wins: 0,
            loss: 0,
            league: 1,
            birthDay: `${year}-${month}-${day}`,
            level: 1,
            fractionLevel: 5,
            phone: 0,
            addmin: false,
        },
        state: {
            switch: true,
            you: {
                user: {
                    version: "0.1",
                    ban: false,
                    email: "ejemplo@correo.com",
                    gametag: "invitado",
                    pictureTrainer: "0",
                    experience: 0,
                    tickets: 5,
                    pokeballs: 50,
                    bagPokemons: 30,
                    coins: 1500,
                    box: 5,
                    wins: 0,
                    loss: 0,
                    league: 1,
                    level: 1,
                    fractionLevel: 5,
                    phone: 0,
                    addmin: false,
                },
                team: {
                    pokemons: [],
                    selected: {}
                },
            },
            rival: {
                user: {},
                team: {
                    basePokemon: [],
                    dataPokemon: [],
                    pokemons: [],
                    selected: {}
                },
            },
            battle: {
                seed: 0,
                timmer: 5,
                phaseSelections: true,
                finalBattle: false,
                loseBattle: "",
            },
            app: {
                loging: false,
                register: false,
                release: 0,
            },
            filtersList: {
                noPokedex: "",
                name: "",
                stadistic: "all",
                type1: "all",
                type2: "all",
                rating: "all",
                news: false,
                favorite: false,

            },



        },
        cards: [],
        rival: {},
        battle: {

        },
        filtersList: {
            noPokedex: "",
            name: "",
            stadistic: "all",
            type1: "all",
            type2: "all",
            rating: "all",
            news: false,
            favorite: false,

        },
    },
    imagesTrainers: [
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


    trainersRivals: [
        {
            version: "0.1",
            ban: false,
            email: "ejemplo@correo.com",
            gametag: "",
            pictureTrainer: "0",
            league: 1,
            level: 1,
            fractionLevel: 5,
            phone: 0,
            addmin: false,
        },
        {
            version: "0.1",
            ban: false,
            email: "ejemplo@correo.com",
            gametag: "",
            pictureTrainer: "0",
            league: 1,
            level: 1,
            fractionLevel: 5,
            phone: 0,
            addmin: false,
        },
        {
            version: "0.1",
            ban: false,
            email: "ejemplo@correo.com",
            gametag: "",
            pictureTrainer: "0",
            league: 1,
            level: 1,
            fractionLevel: 5,
            phone: 0,
            addmin: false,
        },
        {
            version: "0.1",
            ban: false,
            email: "ejemplo@correo.com",
            gametag: "",
            pictureTrainer: "0",
            league: 1,
            level: 1,
            fractionLevel: 5,
            phone: 0,
            addmin: false,
        },
        {
            version: "0.1",
            ban: false,
            email: "ejemplo@correo.com",
            gametag: "",
            pictureTrainer: "0",
            league: 1,
            level: 1,
            fractionLevel: 5,
            phone: 0,
            addmin: false,
        },
    ],
    navMenuOptions: [
        ["Home", "home"],
        ["Box", "box"],
        ["Cards", "cards"],
        ["Trainer", "trainer"],
        ["Expedition", "expedition"],
        ["League", "league"],
        ["About Us", "about-us"],
    ],

    percentageRarity: {
        basic: [0.6, 8, 3, [5, 1], "basic"],//structure [%,maxlevel,maxScalePokemon , valueReleased => [pokeballs , expeditions]]
        comun: [0.8, 16, 5, [10, 2], "comun"],
        rare: [0.95, 32, 7, [15, 3], "rare"],
        epic: [0.98, 40, 9, [20, 10], "epic"],
        legendary: [1.2, 70, 11, [25, 15], "legendary"],
        god: [2, 100, 20, [50, 10], "god"],
    },
    percentageShiny: 0.99,
    sizePokedex: [1, 1010],
    sizeTeam: 5,
    totalScore4battlePokemon:200,
    cautionPokemons: [
        144, // Articuno
        145, // Zapdos
        146, // Moltres
        150, // Mewtwo
        151, // Mew
        243, // Raikou
        244, // Entei
        245, // Suicune
        249, // Lugia
        250, // Ho-Oh
        251, // Celebi
        377, // Regirock
        378, // Regice
        379, // Registeel
        380, // Latias
        381, // Latios
        382, // Kyogre
        383, // Groudon
        384, // Rayquaza
        385, // Jirachi
        386, // Deoxys
        480, // Uxie
        481, // Mesprit
        482, // Azelf
        483, // Dialga
        484, // Palkia
        485, // Heatran
        486, // Regigigas
        487, // Giratina
        488, // Cresselia
        491, // Darkrai
        492, // Shaymin
        493, // Arceus
        494, // Victini
        638, // Cobalion
        639, // Terrakion
        640, // Virizion
        641, // Tornadus
        642, // Thundurus
        643, // Reshiram
        644, // Zekrom
        645, // Landorus
        646, // Kyurem
        647, // Keldeo
        648, // Meloetta
        649, // Genesect
        716, // Xerneas
        717, // Yveltal
        718, // Zygarde
        719, // Diancie
        720, // Hoopa
        721, // Volcanion
        772,
        773,
        785, // Tapu Koko
        786, // Tapu Lele
        787, // Tapu Bulu
        788, // Tapu Fini
        789, // Cosmog
        790, // Cosmoem
        791, // Solgaleo
        792, // Lunala

        800, // Necrozma
        801, // Magearna
        802, // Marshadow
        804,
        807, // Zeraora
        808, // Meltan
        809, // Melmetal
        888,
        889,
        890,
        891,
        892,
        894,
        895,
        896,
        897,
        898,

        902,
        903,
        904,
        905,
        993,
        1001,
        1002,
        1003,
        1004,
        1007,
        1008,

    ],

    ultraentes: [
        799,
        794
    ],
    types: [
        "all",
        "bug",
        "dark",
        "dragon",
        "electric",
        "fairy",
        "figthing",
        "fire",
        "fliying",
        "ghost",
        "grass",
        "ground",
        "ice",
        "normal",
        "poison",
        "psychic",
        "rock",
        "steel",
        "water",
    ],

    PokemonStrengthsTypes: {
        water: {
            weaknesses: ["electric", "grass"],
            strengths: ["fire", "ground", "rock"],
        },
        fire: {
            weaknesses: ["water", "ground", "rock"],
            strengths: ["grass", "ice", "bug", "steel"],
        },
        grass: {
            weaknesses: ["fire", "ice", "poison", "flying", "bug"],
            strengths: ["water", "ground", "rock"],
        },
        electric: {
            weaknesses: ["ground"],
            strengths: ["water", "flying"],
        },
        ice: {
            weaknesses: ["fire", "fighting", "rock", "steel"],
            strengths: ["grass", "ground", "flying", "dragon"],
        },
        normal: {
            weaknesses: [],
            strengths: [],
        },
        ice: {
            weaknesses: ["fire", "fighting", "rock", "steel"],
            strengths: ["grass", "ground", "flying", "dragon"],
        },
        fighting: {
            weaknesses: ["flying", "psychic", "fairy"],
            strengths: ["normal", "ice", "rock", "dark", "steel"],
        },
        poison: {
            weaknesses: ["ground", "psychic"],
            strengths: ["grass", "fairy"],
        },
        ground: {
            weaknesses: ["water", "grass", "ice"],
            strengths: ["fire", "electric", "poison", "rock", "steel"],
        },
        flying: {
            weaknesses: ["electric", "ice", "rock"],
            strengths: ["grass", "fighting", "bug"],
        },
        psychic: {
            weaknesses: ["bug", "ghost", "dark"],
            strengths: ["fighting", "poison"],
        },
        bug: {
            weaknesses: ["fire", "flying", "rock"],
            strengths: ["grass", "psychic", "dark"],
        },
        rock: {
            weaknesses: ["water", "grass", "fighting", "ground", "steel"],
            strengths: ["fire", "ice", "flying", "bug"],
        },
        ghost: {
            weaknesses: ["ghost", "dark"],
            strengths: ["psychic", "ghost"],
        },
        dragon: {
            weaknesses: ["ice", "dragon", "fairy"],
            strengths: ["dragon"],
        },
        steel: {
            weaknesses: ["fire", "fighting", "ground"],
            strengths: ["ice", "rock", "fairy"],
        },
        fairy: {
            weaknesses: ["poison", "steel"],
            strengths: ["fighting", "dragon", "dark"],
        },
    },


    stadistic: [
        ["---", ""],

        ["HP-min to max-🔼", "0"],
        ["HP-max to min-🔽", "0"],

        ["Attack-min to max-🔼", "1"],
        ["Attack-max to min-🔽", "1"],

        ["Defense-min to max-🔼", "2"],
        ["Defense-max to min-🔽", "2"],

        ["Attack+-min to max-🔼", "3"],
        ["Attack+-max to min-🔽", "3"],

        ["Defense+-min to max-🔼", "4"],
        ["Defense+-max to min-🔽", "4"],

        ["Speed-min to max-🔼", "5"],
        ["Speed-max to min-🔽", "5"],

        ["Rating-min to max-🔼", "6"],
        ["Rating-max to min-🔽", "6"],

        ["Level-min to max-🔼", "7"],
        ["Level-max to min-🔽", "7"],
    ]


};
