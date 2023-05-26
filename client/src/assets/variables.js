

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
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${namePokemon}.png`;
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
                console.log(`POKEMON SELECT ${data.name}`, data);
                return data;
            })
    },
    getRarity: (user) => {
        const value = Math.random();
        const rarity = variables.percentageRarity;
        const addedUserCount = user.level / 400
        let returnRarity = Object.keys(rarity)[0];
        Object.keys(rarity).map((rare) => {
            //console.log(rarity[rare], rare)
            if ((value + addedUserCount) > rarity[rare][0]) {
                returnRarity = rare
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
        console.log("level: ", level);
        return level;
    },

    getNoPokedex: () => {
        let number = Math.floor((Math.random() * variables.sizePokedex[1]) + variables.sizePokedex[0]);

        if (variables.cautionPokemons.includes(number)) {
            console.log(`cautionPokemon!!! ---------- o.O , ${number}`);
            return functions.getNoPokedex();
        } else {
            return number;
        }

    },

    getStats: (database) => {
        const hp = database.stats[0].base_stat.toString();
        const attack = database.stats[1].base_stat.toString();
        const defense = database.stats[2].base_stat.toString();
        const specialAttack = database.stats[3].base_stat.toString();
        const specialDefense = database.stats[4].base_stat.toString();
        const speed = database.stats[5].base_stat.toString();

        return `${hp},${attack},${defense},${specialAttack},${specialDefense},${speed}`;
    },
    getEffort: (database) => {
        const hp = database.stats[0].effort.toString();
        const attack = database.stats[1].effort.toString();
        const defense = database.stats[2].effort.toString();
        const specialAttack = database.stats[3].effort.toString();
        const specialDefense = database.stats[4].effort.toString();
        const speed = database.stats[5].effort.toString();

        return `${hp},${attack},${defense},${specialAttack},${specialDefense},${speed}`;
    },
    getTypes: (database) => {
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
    getScale: (rarity) => {
        let scale = "";

        for (let i = 0; i < 6; i++) {
            if (i === 0) {
                scale = scale + Math.round(Math.random() * variables.percentageRarity[rarity][2]);
            } else {
                scale = scale + "," + Math.round(Math.random() * variables.percentageRarity[rarity][2]);
            }
        }
        return scale;
    },

    getPokemon: (trainer, database, levelPokemon, rarity, shiny, genre) => {
        const basePokemon = variables.initialState.pokemon;
        basePokemon.genre = genre;
        basePokemon.shiny = shiny;
        basePokemon.noPokedex = database.id;
        basePokemon.name = database.name;
        basePokemon.trainer = trainer.email;
        basePokemon.stats = functions.getStats(database);
        basePokemon.scale = functions.getScale(rarity);
        basePokemon.effort = functions.getEffort(database);
        basePokemon.types = functions.getTypes(database);
        basePokemon.level = levelPokemon;
        // console.log("GET POKEMON", "pokemon :", basePokemon);
        return basePokemon;
    },

    createPokemon: async () => {
        try {
            const noPokedex = functions.getNoPokedex();
            let databasePokemon = {};

            const data = await functions.getPokemon(noPokedex);
            databasePokemon = data;
            //console.log(".....................", databasePokemon);
            return databasePokemon;
        } catch (error) {
            console.log(error);
        }
    },

    generatePokemon: (trainer, database, levelPokemon, rarity, shiny, genre) => {
        const newPokemon = functions.getPokemon(trainer, database, levelPokemon, rarity, shiny, genre);

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
                console.log('Response:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },
    getEvolution: async (noPokedex) => {
        fetch(`https://pokeapi.co/api/v2/evolution-chain/${noPokedex}`)
            .then(response => response.json())
            .then(data => console.log("...................DATA...........................", data.chain.evolves_to))
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
                        totalStat++;
                    }
                })
                //console.log(totalStat,Pokemon.name)
                return totalStat;
            } else if (indexStat == 7) {
                let totalStat = Pokemon.level;
                return totalStat
            } else if (indexStat == 0) {
                let totalStat = 5 * (parseInt(baseStats[indexStat] * 1.3) + parseInt(scaleStats[indexStat] * 3) + parseInt(effortStats[indexStat] * 2) + parseInt((level + 1) * 1.3));
                //console.log( Pokemon.name, totalStat);
                return totalStat;
            } else if (indexStat == 5) {

                let totalStat = (parseInt(baseStats[indexStat]) + parseInt(scaleStats[indexStat]) + parseInt(effortStats[indexStat]) + parseInt((level + 1))) / 10;
                //console.log( Pokemon.name, totalStat);
                return totalStat;

            } else {

                let totalStat = (parseInt(baseStats[indexStat] * 1) + parseInt(scaleStats[indexStat] * 2) + parseInt(effortStats[indexStat] * 1.5) + parseInt((level + 1) * 1));
                //console.log( Pokemon.name, totalStat);
                return totalStat;

            }
        }
        // arrayPokemons.sort((pokemon,pokemonNext)=>{
        // })

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
                        console.log("filterName", filterCards);
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
        return [Math.round(score/7), Math.round(score / 10),Math.round(score*1.25)];

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
        cards: [],
        rival: {},
        battle: {},
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
        basic: [0.6, 8, 3, [5, 1]],//structure [%,maxlevel,maxScalePokemon , valueReleased => [pokeballs , expeditions]]
        comun: [0.8, 16, 5, [10, 2]],
        rare: [0.95, 32, 7, [15, 3]],
        epic: [0.98, 40, 9, [20, 10]],
        legendary: [1.2, 70, 11, [25, 15]],
        god: [2, 100, 20, [50, 10]],
    },
    percentageShiny: 0.99,
    sizePokedex: [1, 1010],
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
        993,
        1007,
        1008
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
