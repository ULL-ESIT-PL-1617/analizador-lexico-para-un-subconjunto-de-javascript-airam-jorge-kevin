//authsession.js
"use strict";
var config = require('./package.json');
let express = require('express'),
    app = express(),
    session = require('express-session');
let cookieParser = require('cookie-parser');
let path = require('path');
let util = require("util");

let bcrypt = require("bcrypt-nodejs");
let users = {
  Mickey : bcrypt.hashSync("Mouse")
};

let instructions = `
Please log in:
<form action="/login" method="GET">
  User name:<br>
  <input type="text" name="username" value="Mickey">
  <br>
  Password:<br>
  <input type="password" name="password" value="Mouse">
  <br><br>
  <input type="submit" value="Submit">
  <button type="button" onclick="window.location.href = '/logout';">Logout</button>
</form>
<ul>
<li>User: Mickey, Password: Mouse</li>
<li><a href="/content/gitbook">Gitbook</a></li>
<li><a href="/content/analizador">Analizador léxico<a/></li>
</ul>
`;

let layout = function(x) { return x+"<br />\n"+instructions; };

app.use(cookieParser());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.use(function(req, res, next) {
  console.log("Cookies :  " + util.inspect(req.cookies));
  console.log("session :  " + util.inspect(req.session));
  next();
});

// Authentication and Authorization Middleware
let auth = function(req, res, next) {
  if (req.session && req.session.user in users)
    return next();
  else
    return res.sendStatus(401); // https://httpstatuses.com/401
};

// Login endpoint
app.get('/login', function (req, res) {
  console.log(req.query);
  if (!req.query.username || !req.query.password) {
    console.log('login failed');
    res.send('login failed');
  } else if(req.query.username in users  &&
            bcrypt.compareSync(req.query.password, users[req.query.username])) {
    req.session.user = req.query.username;
    req.session.admin = true;
    res.send(layout("<span style='color:green'>Login success! user "+req.session.user+"</span>"));
  } else {
    console.log(`Login ${util.inspect(req.query)} failed`);
    res.send(layout(`<span style="color:red">Login ${util.inspect(req.query)} failed. You are ${req.session.user || 'not logged'}</span>`));
  }
});

app.get('/', function(req, res) {
  res.send(instructions);
});
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send(layout("<span style='color:green'>Logout success!</span>"));
});

// Get content endpoint
app.get('/content/*?',
    auth  // next only if authenticated
);

app.use('/content', express.static(path.join(__dirname, 'public')));

var port = (process.env.PORT || config.appPort || 80);
app.listen(port);
console.log("App running at http://localhost:" + port);
