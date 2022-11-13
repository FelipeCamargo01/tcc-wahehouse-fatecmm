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
console.log("1");
require('dotenv').config();
console.log("2");
const PORT = process.env.SERVER_PORT
console.log("3");
const app = express();
console.log("4");
app.use(cors());
console.log("5");
app.use(express.json());
console.log("6");
app.use(express.static(path.join(__dirname, 'build')));
console.log("7");
app.use(function(req, res, next) {
  console.log("8");
  res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
  );
  console.log("9");
  next();
  console.log("10");
})

console.log("11");
app.use('/api/', routes);
console.log("12");
app.use('/api/auth/', authRoutes);
console.log("13");
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
console.log("14");
// MODELS
const { User, Product, StockHistory, Supplier } = require('../models/models');
console.log("15");
if (process.env.NODE_ENV === 'production') {
  console.log("17");
  app.get('*', (req, res) => {
    console.log("19");
    res.sendFile(path.join(__dirname + '/build/index.html'));
  });
  console.log("18");
}
console.log("16");
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

