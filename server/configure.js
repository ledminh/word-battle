module.exports = (express, app, passport, data) => {
  var session = require('express-session');

  //CONFIGURE PASSPORT
  require('./passport')(passport, data);

  //CONFIGURE MIDDLEWARE
      //For passport
  app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

    //Parse JSON
  app.use(require('body-parser').json());



}
