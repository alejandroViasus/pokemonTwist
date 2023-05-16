const mongoose=require("mongoose");


const pokemonSchema = mongoose.Schema(
    {
        //!principalInfo
        noPokedex:{
            type:Number,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        pictureHD:{
            type:String,
            required:true
        },
        pictureSpriteFrontDefault:{
            type:String,
            required:true
        },
        pictureImgModel3D:{
            type:String,
            required:true
        },
        trainer:{
            type:String,
            required:true
        },
        team:{
            type:Boolean,
            required:true
        },
        favorite:{
            type:Boolean,
            required:true
        },
        //!stadistics
        scale:{
            type:String,
            required:true
        },
        heald:{
            type:Boolean,
            required:true
        },
    },
    // {
    //     timestamps:true,
    //     versionKey:false
    // }
);

module.exports = mongoose.model("Pokemon", pokemonSchema);