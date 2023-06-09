const mongoose=require("mongoose");

const userSchema = mongoose.Schema(
    {
        //!principalInfo
        version:{
            type:String,
            required:true
        },
        ban:{
            type:Boolean,
            required:true
        },
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

        coins:{
            type:Number,
            required:true
        },
        tickets:{
            type:Number,
            required:true
        },
        pokeballs:{
            type:Number,
            required:true
        },
        bagPokemons:{
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
        },
        level:{
            type:Number,
            required:true
        },
        fractionLevel:{
            type:Number,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        addmin:{
            type:Boolean,
            required:true
        },
    },{
        timestamps:true,
        versionKey:false
    }
);

module.exports = mongoose.model("User", userSchema);