const express = require("express");
const cors = require('cors')
const path = require('path');
const connection = require('../database/database');

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

const apiRoutes = express.Router();
const authRoutes = express.Router();
apiRoutes.use("/api", require('./routes'));
authRoutes.use("/api/auth", require('./auth/auth.routes'));

app.use(apiRoutes);
app.use(authRoutes);

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
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
  });
}
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

