const express = require("express");
const pokemonSchema = require("../models/Pokemon/pokemon");

const router = express.Router();

//status
const STATUS_OK = 200;
const STATUS_ERROR = 500;
const STATUS_NOT_FOUND = 404;


router.route("/pokemon")
//!new Pokemon
  .post(async (req, res) => {
    try {
      const pokemon = new pokemonSchema(req.body);
      console.log("New Pokemon!", pokemon.name, pokemon.scale);
      const data = await pokemon.save();
      res.status(STATUS_OK).json(data);
    } catch (error) {
      console.error(error);
      res.status(STATUS_ERROR).json({ message: error.message });
    }
  })
//! get All Pokemons
  .get(async (req, res) => {
    try {
        const { email } = req.query;
        const data = await pokemonSchema.find({ trainer: email });
        console.log("userData_:", data);
        res.status(STATUS_OK).json(data.reverse());
    } catch (error) {
        console.error(error);
        res.status(STATUS_ERROR).json({ message: error.message });
    }
  });


  router.route("/pokemon/allnew")
  //! get All Pokemons
    .get(async (req, res) => {
      try {
          const { email } = req.query;
          //console.log(req.query,".........");
          //console.log("email_get_all",email)
          const data = await pokemonSchema.find({ trainer: email ,new:true});
          console.log("userData_:", data);
          res.status(STATUS_OK).json(data);
      } catch (error) {
          console.error(error);
          res.status(STATUS_ERROR).json({ message: error.message });
      }
    });

router.route("/pokemons/:id")
//! get one Pokemon
    .get(async (req,res)=>{
        try{
            const { id } = req.params;
            const data = await pokemonSchema.find({ _id: id });
            if (!data) {
                return res.status(STATUS_NOT_FOUND).json({ message: "Pokemon not found" });
            }
            console.log("getPokemon:", data.name);
            res.status(STATUS_OK).json(data);
        }catch(error){
            console.error(error);
            res.status(STATUS_NOT_FOUND).json({ message: error.message });
        }
    })
//!upDate pokemon
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const pokemon = req.body;
      console.log("upDatePokemon :_AA__",pokemon);
      const data = await pokemonSchema.updateOne({ _id: id }, { $set: pokemon });
      if (!data) {
        return res.status(STATUS_NOT_FOUND).json({ message: "Pokemon not found" });
    }
      res.status(STATUS_OK).json(data);
    } catch (error) {
      console.error(error);
      res.status(STATUS_ERROR).json({ message: error.message });
    }
  })
  .delete(async (req, res) => {
//!delete Pokemon
    try {
      const { id } = req.params;
      const data = await pokemonSchema.deleteOne({ _id: id });
      if (data.deletedCount === 0) {
        res.status(STATUS_NOT_FOUND).json({ message: "Pokemon not found" });
      } else {
        res.json({ message: "Pokemon deleted successfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(STATUS_ERROR).json({ message: error.message });
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