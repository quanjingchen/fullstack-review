const { getReposByUsername } = require('../helpers/github.js');
const { save, getAll } = require('../database/index.js');

const express = require('express');
//Middleware
const cors = require('cors');

let app = express();
app.use(cors());
app.use(express.json());





// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static(__dirname + '/../client/dist/'));


app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  var username = req.body.username;
  console.log('GETTING USERNAME: ', username);
  getReposByUsername(username, (err, data) => {
    if (err) {
      console.log('ERROR WITH GETTING DATA FROM GIT: ', err);
      res.sendStatus(400);
    } else {
      save(data, (err) => {
        if (err) {
          // console.log('DATA ADDED TO DATABASE WITH ERR ', err);
          res.sendStatus(400);
        } else {
          console.log('DATA ADDED TO DATABASE WITH LENGTH OF ', data.length);
          res.status(201).send('Data created!');
        }

      })
    }
  })

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  getAll((err, data) => {
    if (err) {
      res.sendStatus(404);
      console.log('ERROR WITH GETTING DATA: ', err);
    } else {
      console.log('SUCCESSFULLY GETTING DATA: ', data.length);
      res.status(200).json(data);
    }
  })

});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

