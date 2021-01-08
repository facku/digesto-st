require('dotenv').config();

const express = require('express');

const cors = require('cors');

const fileUpload = require('express-fileupload');

const router = require('./routes/index');

const db = require('./database');

const PORT = process.env.PORT || 3333;

const app = express();

app.use(cors());

app.use(fileUpload());

app.use(express.static('public'));

app.use(express.json());
// app.use(express.urlencoded());

app.use('/api', router);

// console.log('Talk to mongo-db...');

db.connect()
  .then(async () => {
    // console.log(`Connected to MongoDB ON PORT ${process.env.MONGO}`);

    app.listen(PORT, (server) => {
      // console.log('SERVER LISTEN ON PORT ', PORT);
    });
  })
  .catch((mongoError) => {
    console.log(
      `MONGODB ERROR: ${
        mongoError.message || errorMongo || 'Undefined Error in Mongo'
      }`
    );
    return process.exit();
  });

module.exports = { app, db };
