const express = require("express");
const userSchema = require("../models/User/user");

const router = express.Router();

//status
const STATUS_OK = 200;
const STATUS_ERROR = 500;
const STATUS_NOT_FOUND = 404;

router.route("/users")
    //!new User
    .post(async (req, res) => {
        try {
            const user = new userSchema(req.body);
            console.log("New User!", user.gametag, user.email);
            const data = await user.save();
            res.status(STATUS_OK).json(data);
        } catch (error) {
            console.error(error);
            res.status(STATUS_ERROR).json({ message: error.message });
        }
    })
    //!get All Users
    .get(async (req, res) => {
        try {
            const data = await userSchema.find({});
            console.log("allUsers:", data);
            res.status(STATUS_OK).json(data);
        } catch (error) {
            console.error(error);
            res.status(STATUS_ERROR).json({ message: error.message });
        }
    });

    router.route("/users/:id")
    //! get One User
    .get(async (req, res) => {
        try {
            const { id } = req.params;
            const data = await userSchema.findById(id);
            if (!data) {
                return res.status(STATUS_NOT_FOUND).json({ message: "User not found" });
            }
            console.log("getUser:", data.gametag);
            res.status(STATUS_OK).json(data);
        } catch (error) {
            console.log(error);
            res.status(STATUS_NOT_FOUND).json({ message: error.message })
        }
    })
    //! update User
    .put(async (req, res) => {
        try {
            const { id } = req.params;
            const user = req.body;
            console.log("upDateUser :_", user);
            const data = await userSchema.findById(id);
            if (!data) {
                return res.status(STATUS_NOT_FOUND).json({ message: "User not found" });
            }
            await userSchema.updateOne({ _id: id }, { $set: user });
            res.status(STATUS_OK).json({ message: "User updated successfully" });
        } catch (error){
            console.log(error);
            res.status(STATUS_NOT_FOUND).json({ message: error.message })
        }
    })
    //! delete User
    .delete(async (req, res) => {
        try {
            const { id } = req.params;
            const data = await userSchema.findById(id);
            if (!data) {
                return res.status(STATUS_NOT_FOUND).json({ message: "User not found" });
            }
            await userSchema.deleteOne({ _id: id });
            res.json({ message: "User deleted successfully" });
        } catch(error) {
            console.error(error);
            res.status(STATUS_ERROR).json({ message: error.message });
        }
    })

    router.route("/users/email/:email")
    //! get One User for email
    .get(async (req, res) => {
        try {
            const { email } = req.params;
            const data = await userSchema.findOne({ email });
            if (!data) {
              return res
                .status(STATUS_NOT_FOUND)
                .json({ message: `User (${email}) not found` });
            }
            console.log("getUser:", data.gametag);
            res.status(STATUS_OK).json(data);
        } catch (error) {
            console.log(error);
            res.status(STATUS_NOT_FOUND).json({ message: error.message })
        }
    })

    router.route("/users/gametag/:gametag")
    //! get One User
    .get(async (req, res) => {
        try {
            const { gametag } = req.params;
            const data = await userSchema.findOne({gametag});
            if (!data) {
                return res.status(STATUS_NOT_FOUND).json({ message: "User not found" });
            }
            console.log("getUser:", data.gametag);
            res.status(STATUS_OK).json(data);
        } catch (error) {
            console.log(error);
            res.status(STATUS_NOT_FOUND).json({ message: error.message })
        }
    })

module.exports = router;
