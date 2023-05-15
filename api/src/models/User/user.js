const mongoose=require("mongoose");

const userSchema = mongoose.Schema(
    {
        //!principalInfo
        email:{
            type:String,
            required:true
        },
        gametag:{
            type:String,
            required:true
        },
        pictureTrainer:{
            type:String,
            required:true
        },
        experience:{
            type:Number,
            required:true
        },
        //!economy
        tickets:{
            type:Number,
            required:true
        },
        pokeballs:{
            type:Number,
            required:true
        },
        box:{
            type:Number,
            required:true
        },
        //! stadistics
        wins:{
            type:Number,
            required:true
        },
        loss:{
            type:Number,
            required:true
        },
        league:{
            type:Number,
            required:true
        }
    },{
        timestamps:true,
        versionKey:false
    }
);

module.exports = mongoose.model("User", userSchema);