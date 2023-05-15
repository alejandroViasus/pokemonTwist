const express = require("express");
const userSchema = require("../models/Users/user");

const router = express.Router();

//status
const STATUS_USER_OK = 200;
const STATUS_USER_ERROR = 500;
const STATUS_USER_NOT_FOUND = 404;

router.route("/users")
  //!new User
  .post(async (req, res) => {
    try {
      const user = new userSchema(req.body);
      console.log("New User!", user.gametag, user.email);
      const data = await user.save();
      res.status(STATUS_USER_OK).json(data);
    } catch (error) {
      console.error(error);
      res.status(STATUS_USER_ERROR).json({ message: error.message });
    }
  })
  //!get All Users
  .get(async (req, res) => {
    try {
      const data = await userSchema.find({});
      console.log("allUsers:", data);
      res.status(STATUS_USER_OK).json(data);
    } catch (error) {
      console.error(error);
      res.status(STATUS_USER_ERROR).json({ message: error.message });
    }
  });

  router.route("/users/:id")
  //! get One User
  .get(async (req , res)=>{
    try{
        const { email } = req.params;
        const data = await userSchema.find({email:email});
        console.log("getUser:", data.gametag); 
        res.status(STATUS_USER_OK).json(data)  
    }catch(error){
        console.log(error);
        res.status(STATUS_USER_NOT_FOUND).json({message:error.message})
    }
  })

module.exports = router;
