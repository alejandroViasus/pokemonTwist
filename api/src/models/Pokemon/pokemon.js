const mongoose = require("mongoose");


const pokemonSchema = mongoose.Schema(
    {
        //!principalInfo

        genre: {
            type: Number,  // example  1 => female 0=>male
            required: true
        },
        shiny: {
            type: Boolean, // example false 
            required: true
        },
        noPokedex: {
            type: Number, // example 1
            required: true
        },
        name: {
            type: String, // example "bulbasaur"
            required: true
        },
        trainer: {
            type: String, // example "example.com"
            required: true
        },
        team: {
            type: Boolean, // example true
            required: true
        },
        favorite: {
            type: Boolean, // example true
            required: true
        },
        new: {
            type: Boolean, // example true
            required: true
        },
        auction: {
            type: Boolean,// example true
            required: true
        },
        //!stadistics
        scale: {
            type: String, // example 5,8,1,4,8,9
            required: true // first (scale) second (stats) thirth(Effort)
        },
        stats: {
            type: String, // example 5,8,1,4,8,9
            required: true // first (scale) second (stats) thirth(Effort)
        },
        effort: {
            type: String, // example 5,8,1,4,8,9
            required: true // first (scale) second (stats) thirth(Effort)
        },
        heald: {
            type: Number,// example 100
            required: true
        },

        maxStack4level: {
            type: Number, // example (10+(ModelPokemon.level*2))
            required: true
        },
        actualStack: {
            type: Number, // example 3
            required: true
        },
        weight
            : {
            type: Number,// example 16
            required: true
        },
        height: {
            type: Number,// example 16
            required: true
        },
        level: {
            type: Number,// example 16
            required: true
        },
        types: {
            type: String, // example "02,03"
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Pokemon", pokemonSchema);