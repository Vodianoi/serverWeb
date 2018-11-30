const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express()
const models = require('./models/index');

// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add a bit of logging
app.use(morgan('short'))

// Get all the users defined
app.get('/', function (req, res) {
  models.User.findAll()
    .then((users) => {
      res.json(users)
    })
});

// Add a new user to the database
app.post('/', function(req, res) {
  models.User.create({
    username: req.body.username
  })
    .then(() => {
      res.send('User added !')
    })
});



// Get all the gremlins defined
app.get('/gremlins', function (req, res) {
    models.Gremlin.findAll()
        .then((gremlins) => {
            res.json(gremlins)
        })
});


// Add a new gremlin to the database
app.post('/gremlins/:name/:id', function(req, res) {
    models.Gremlin.create({
        name: req.name,
        taille: 10,
        id: req.id
    })
        .then(() => {
            res.send('Gremlin added !')
        })
});


app.param(['name'], (req, res, next, name) =>{
    req.name = name;
    next();
});

app.param(['id'], (req, res, next, id) =>{
    req.id = id;
    next();
});

// Synchronize models
models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   * 
   * Listen only when database connection is sucessfull
   */
  app.listen(3000, function() {
    console.log('Express server listening on port 3000');
  });
});