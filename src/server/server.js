const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const cookieParser = require('cookie-parser');
const userCtrl = require('./controllers/userCtrl.js');
const gitHubCtrl = require('./controllers/gitHubCtrl.js');
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const session = require('express-session');

// Github creds
var GITHUB_CLIENT_ID = "91216db770ffe6520a38";
var GITHUB_CLIENT_SECRET = "16f85dea805ab29c26321008f96b5d3813bbbc04";

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Serialize user into session
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Register passport github middleware
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/github/oauth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

// Parse body
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json(), cookieParser());

// Handle session
// Session will reset after each server reset
app.use(session({ secret: 'randomStringToSalt', resave: false, saveUninitialized: false }));

// Register passport as Express middleware
// Register passport session handling as middleware
app.use(passport.initialize());
app.use(passport.session());


// app.use(cors())

// Serve static
app.use(express.static(path.join(__dirname, '../../bin')));

// Endpoint to handle github oAuth
app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

// Call back after intitial oAuth approval. Github redirects the user to here
// TODO Look into redirecting to user intended destination on first login
app.get('/github/oauth/callback',
  passport.authenticate('github', { successRedirect: '/user/basic', failureRedirect: '/login' })
);

// Handle login
app.get('/login', function (req, res) {
  res.redirect('/auth/github');
});

// Handle logout
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

//Handle gets
app.get('/user/basic', userCtrl.loginUser);
app.get('/user/getInfo', userCtrl.getUserInfo);
//Handle posts to the search
app.post('/search', userCtrl.getProjects);

// Establish server
app.listen(3000, () => {
  console.log('Listening on port 3000.');
});
