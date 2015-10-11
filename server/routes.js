/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var secrets = require('./config/secrets')

var FACEBOOK_APP_ID = secrets.FACEBOOK_APP_ID;
var FACEBOOK_APP_SECRET = secrets.FACEBOOK_APP_SECRET;


var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
//setting up passport using Facebook strategy
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:9000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

module.exports = function(app) {

  // Insert routes below

  //Facebook auth route
  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
  app.use('/api/things', require('./api/thing'));


  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
