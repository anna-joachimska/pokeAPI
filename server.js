const express = require('express');
const pokemonRoutes = require("./src/routes/pokemons");
const typeRoutes = require('./src/routes/types');
const abilityRoutes = require('./src/routes/abilities');
const statisticRoutes = require('./src/routes/statitics');
const {pageNotFound, errorHandler} = require("./src/errors/errorHandler")

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
app.use('/statistics', statisticRoutes);

app.use(pageNotFound);
app.use(errorHandler);

const port = process.env.PORT || 8888;

app.listen(port, () => console.log(`server is running on port ${port}`));