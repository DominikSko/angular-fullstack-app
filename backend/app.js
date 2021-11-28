const express = require('express'); // import express
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts')
// database Dominik / YUKd1LUDb6CkJgI2

const app = express();  // nasza apka express backend

mongoose.connect('mongodb+srv://Dominik:YUKd1LUDb6CkJgI2@cluster0.nd5gp.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {  // funkcja zeby wylaczyc CORS czyli ze apka nie moze sie polaczyc z serverem localhost 3000 z 4000 np
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRoutes);

module.exports = app; // export this backend app
