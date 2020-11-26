const express = require('express');
const bodyParser = require('body-parser');
var multer = require('multer');
var forms = multer();
// const formidableMiddleware = require('express-formidable');

// create express app
const app = express();

var cors = require('cors')

// Setup server port
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors())

app.use(forms.array())
// app.use(formidableMiddleware());


// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Require employee routes
const movieRoutes = require('./src/routes/movie.routes')

// using as middleware
app.use('/api/v1/movies', movieRoutes)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});