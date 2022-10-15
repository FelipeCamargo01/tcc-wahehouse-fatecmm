const express = require("express");
const cors = require('cors')
const path = require('path');
const connection = require('../database/database');

const routes = require('./routes.js');
const authRoutes = require('./auth/auth.routes');

//DATABASE
connection
   .authenticate()
   .then(() => {
       console.log('Conexão feita com sucesso!');
   })
   .catch(erro => {
       console.log('Problemas na conexão');
       console.log(erro);
   });

//.ENV CONFIGS
require('dotenv').config();

const PORT = process.env.SERVER_PORT

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use(function(req, res, next) {
  res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
  );
  next();
})

app.use('/api/', routes);
app.use('/api/auth/', authRoutes);
app.use((error, req, res, next) => {
  console.log('ERROR STACK:');
  console.log(error.stack);
  console.log('ERROR CONTENT:');
  console.log(error.message);
  res.status(error.status || 200);
  res.json({
    message: 'Error',
    data: error.message,
    code: error.code
  })
});

// MODELS
const { User, Product, StockHistory, Supplier } = require('../models/models');

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

