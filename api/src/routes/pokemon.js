const express = require("express");
const pokemonSchema = require("../models/Pokemons/pokemon");

const router = express.Router();

//status
const STATUS_USER_ERROR = 201;

//! CRUD operations for pokemon
router.route("/pokemon")
    //!new Pokemon
  .post(async (req, res) => {
    try {
      const pokemon = new pokemonSchema(req.body);
      console.log("New Pokemon!", pokemon.name, pokemon.scale);
      const data = await pokemon.save();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  })
  //! getPokemon
  .get(async (req, res) => {
    try {
      const { email } = req.params;
      const data = await pokemonSchema.find({ trainer: email });
      console.log("userData_:", data);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });

router.route("/pokemons/:id")
    //!upDate pokemon
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const pokemon = req.body;
      console.log("upDatePokemon", req.body, pokemon);
      const data = await pokemonSchema.updateOne({ _id: id }, { $set: pokemon });
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  })
  .delete(async (req, res) => {
    //!delete Pokemon
    try {
      const { id } = req.params;
      const data = await pokemonSchema.deleteOne({ _id: id });
      if (data.deletedCount === 0) {
        res.status(404).json({ message: "Pokemon not found" });
      } else {
        res.json({ message: "Pokemon deleted successfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;



//?OldScript
// const express = require("express");
// const pokemon = require("../models/Pokemons/pokemon");
// const { find } = require("../models/Pokemons/pokemon");
// const pokemonSchema = require("../models/Pokemons/pokemon");

// const router = express.Router();

// //status
// const STATUS_USER_ERROR = 201;

// //! create pokemon
// router.post(`/pokemon`, (req, res) => {
//     const pokemon = new pokemonSchema(req.body);
//     console.log("POKEMON!!!!!!", pokemon.name, pokemon.scale)
//     pokemon.save()
//         .then((data) => { res.json(data) })
//         .catch((error) => res.json({ message: console.error(error) }));
// });

// //! get all pokemons
// router.get(`/pokemons/:email`, (req, res) => {
//     try {
//         const { email } = req.params
//         pokemonSchema
//         .find({trainer:email})
//         .then((data) => { 
//             console.log("userData_:",data)
//             res.status(200).json(data);
//         })
//     } catch (error) {
//         (error) => res.json({ message: console.error(error) })
//     }    
// });

// //! update pokemon
// router.put(`/pokemons/:id`, (req, res) => {
//     const { id } = req.params;
//     const pokemon=req.body;
//     console.log("upDatePokemon",req.body, pokemon);

//     pokemonSchema
//         .updateOne({_id:id}, { $set:
//             pokemon
//         })
//         .then((data) => { res.json(data) })
//         .catch((error) => res.json({ message: console.error(error) }));
// });

// //! delete pokemon
// router.delete(`/pokemons/:id`, (req, res) => {
//     const { id } = req.params;
//     pokemonSchema
//       .deleteOne({_id:id})
//       .then((data) => {
//         if(data.deletedCount === 0) {
//           res.status(404).json({ message: "Pokemon not found" });
//         } else {
//           res.json({ message: "Pokemon deleted successfully" });
//         }
//       })
//       .catch((error) => res.status(500).json({ message: error.message }));
//   });
  

// module.exports = router;