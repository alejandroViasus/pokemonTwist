const express= require ("express");
const mongoose=require("mongoose")
const app= express();
const userRoutes= require("./routes/user");
const pokemonRoutes= require("./routes/pokemon");
const cors = require('cors');
require("dotenv").config();
const uri= process.env.MONGODB_URI;
const port = process.env.PORT || 9000;
console.log(port , process.env.MONGODB_URI)

//*middleWare
app.use(cors());
app.use(express.json());
app.use('/api',userRoutes);
app.use('/api',pokemonRoutes);


//console.log(uri)
//* routes 



app.get("/",(req,res)=>{
    res.send("Welcome to my api")
})

//* mongoose db conection 

mongoose.connect(uri).then(()=>console.log("Conected to MongoDB Atlas"))
.catch((error)=>console.log(error))

app.listen(port,()=> console.log(`server listening in port : ${port}`))