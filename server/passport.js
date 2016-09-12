module.exports = (passport, data) => {
  FacebookStrategy = require('passport-facebook').Strategy;

  function callbackFunction(accessToken, refreshToken, profile, done){
    process.nextTick(() => {
      data.user.findOne({facebookID: profile.id}, (err, user) => {
        if(err)
          return done(err);

        if(!user){
          var newUser = new data.user({
            facebookID: profile.id,
            score: 0,
            name: profile.displayName,
            photo: profile.photos[0].value,
            lastWord: ""
          });

          newUser.save();
        }

        done(null, {
          facebookID: profile.id,
          name: profile.displayName,
          photo: profile.photos[0].value
        });

      });

    });


  }

  var thisStrategy = new FacebookStrategy({
    clientID: "136051003514696",
    clientSecret: "169c5aa63fbcf7f415b2bcaa8f147d2c",
    callbackURL: "/fb-callback",
    profileFields: ["id", "displayName", "picture.type(large)"]
  }, callbackFunction);

  passport.use(thisStrategy);

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  })
}
