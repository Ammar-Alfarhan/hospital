if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const flash = require('express-flash');
const session = require('express-session');

const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const lostPasswordRouter = require('./routes/lostPassword');
const homePageRouter = require('./routes/homePage');
const countRouter = require('./routes/count');
const detailsRouter = require('./routes/details');
const countComparsionRouter = require('./routes/countComparison');

// const http2 = require ("http2")
// const fs = require("fs")

// const server = http2.createSecureServer({
//     "key": fs.readFileSync("private.pem"),
//     "cert": fs.readFileSync("cert.pem")
// })

// server.on("stream", (stream, headers) => {

//     console.log(stream.id);
//     stream.respond({
//         "content-type": "application/json",
//         "status": 200
//     })

//     // stream.addListener(app);

//     stream.end(JSON.stringify({
//         "user": "Hussein",
//         "id": 823
//     }))
// })


// server.listen(443);
// console.log("listening on port 443");

const port = 8080;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/resetPassword', lostPasswordRouter);
app.use('/', homePageRouter, countRouter, detailsRouter, countComparsionRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.listen(port, function () {
  console.log('Server is running on port ' + port);
});

// const port = 443;

// server.listen(port) 
// console.log("Server is listening on port " + port);

module.exports = app;
