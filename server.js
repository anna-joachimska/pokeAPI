const express = require('express');
// require('dotenv').config();
// const Sequelize = require("sequelize")
const pool = require("../pokeAPI/db")
const pokemonRoutes = require("../pokeAPI/routes/pokemons");
const typeRoutes = require('../pokeAPI/routes/types');
const abilityRoutes = require('../pokeAPI/routes/abilities');

const bodyParser = require('body-parser');

const app = express();


// parse the body of incoming request and use the data
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// allowing requests from different servers to my server (CORS disabled)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
})

// middleware - routes which should handle requests
app.use('/pokemons', pokemonRoutes);
app.use('/types', typeRoutes);
app.use('/abilities', abilityRoutes);

const port = process.env.PORT || 8888;

app.listen(port, () => console.log(`server is running on port ${port}`));