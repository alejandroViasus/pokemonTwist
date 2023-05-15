const express = require("express");
const pokemon = require("../models/Pokemons/pokemon");
const { find } = require("../models/Pokemons/pokemon");
const pokemonSchema = require("../models/Pokemons/pokemon");

const router = express.Router();

//status
const STATUS_USER_ERROR = 201;

//! create pokemon
router.post(`/pokemon`, (req, res) => {
    const pokemon = new pokemonSchema(req.body);
    console.log("POKEMON!!!!!!", pokemon.name, pokemon.scale)
    pokemon.save()
        .then((data) => { res.json(data) })
        .catch((error) => res.json({ message: console.error(error) }));
});

//! get all pokemons
router.get(`/pokemons/:email`, (req, res) => {
    try {
        const { email } = req.params
        pokemonSchema
        .find({trainer:email})
        .then((data) => { 
            console.log("userData_:",data)
            res.status(200).json(data);
        })
    } catch (error) {
        (error) => res.json({ message: console.error(error) })
    }    
});

// update pokemon
router.put(`/pokemons/:id`, (req, res) => {
    const { id } = req.params;
    const pokemon=req.body;
    console.log("upDatePokemon",req.body, pokemon);

    pokemonSchema
        .updateOne({_id:id}, { $set:
            pokemon
        })
        .then((data) => { res.json(data) })
        .catch((error) => res.json({ message: console.error(error) }));
});

module.exports = router;