const express = require("express");
const cors = require("cors");
const path = require("path");
const connection = require("../database/database");

<<<<<<< HEAD
const apiRoutes = require("./routes.js");
const authRoutes = require("./auth/auth.routes.js");
=======
const apiRoutes = require('./routes.js');
const authRoutes = require('./auth/auth.routes.js');
>>>>>>> d55acb444b5b2c8ed61738ffb30664b00e2f8f80

//DATABASE
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso!");
  })
  .catch((erro) => {
    console.log("Problemas na conexão");
    console.log(erro);
  });

//.ENV CONFIGS
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use(express.static(path.join(__dirname, "../build")));

app.use("/api/auth/", authRoutes);
app.use(function (req, res, next) {
=======
app.use(express.static(path.join(__dirname, '../build')));

app.use('/api/auth/', authRoutes);
app.use(function(req, res, next) {
>>>>>>> d55acb444b5b2c8ed61738ffb30664b00e2f8f80
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

<<<<<<< HEAD
app.use("/api/", apiRoutes);
=======
app.use('/api/', apiRoutes);
>>>>>>> d55acb444b5b2c8ed61738ffb30664b00e2f8f80
app.use((error, req, res, next) => {
  console.log("ERROR STACK:");
  console.log(error.stack);
  console.log("ERROR CONTENT:");
  console.log(error.message);
  res.status(error.status || 200);
  res.json({
    message: "Error",
    data: error.message,
    code: error.code,
  });
});
// MODELS

<<<<<<< HEAD
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../build", "index.html"));
=======
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build', 'index.html'));
>>>>>>> d55acb444b5b2c8ed61738ffb30664b00e2f8f80
  });
}
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
