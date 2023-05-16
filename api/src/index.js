require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const pokemonRoutes = require('./routes/pokemon');

const app = express();
const port = process.env.PORT || 9000;
const uri = process.env.MONGODB_URI;
//const uri = 'mongodb+srv://VivaVG:4Minapotodoe@pokemon.wypjxc7.mongodb.net/test';


//*middleware
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', pokemonRoutes);

//*routes
app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

//*mongoose db connection
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.log(error));

app.listen(port, () => console.log(`Server listening on port: ${port}`));
