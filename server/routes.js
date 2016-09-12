module.exports = (express, app, passport, data, io) => {
  const axios = require('axios');

  //SERVE STATIC FILES
  app.use(express.static("public"));
  //======================
  //GAME DATA EXCHANGE
  //======================
  app.get("/get-word", (req, res) => {
    var config = {
      method: "get",
      url: "https://wordsapiv1.p.mashape.com/words/" + req.query.word + "/definitions",
      headers: {
        "X-Mashape-Key" : "6U4iE6ooIomshWAkZDWknoqfNApsp1D7VZjjsntQozuBp6a13V",
        "Accept" : "application/json"
      }
    };

    axios(config).then((resFromAPI) => {
        var randIndex = Math.floor(Math.random()*resFromAPI.data.definitions.length);


        res.send({
          name: req.query.word,
          definition: resFromAPI.data.definitions[randIndex].definition,
          POS: resFromAPI.data.definitions[randIndex].partOfSpeech
        });

    }).catch((error) => {
        res.send({
          error: "word not found"
        });
    });


  });

  app.get("/load-game-data", (req, res) => {
    data.gameData.findOne({gameID: "currentGame"}, (err, game) => {
      if(err)
        throw err;

      var currentWord, currentDef, currentPOS, prevWords, wordsStack;

      //Add game data
      if(!game){
          var newGame = new data.gameData({
          gameID: "currentGame",
          currentWord: "",
          currentPOS: "",
          currentDef: "",
          prevWords: "",
          wordsStack: []
        });

        newGame.save();
        currentWord = currentDef = currentPOS = prevWords = "";
        wordsStack = [];
      }
      else{
        currentWord = game.currentWord;
        currentDef  = game.currentDef;
        currentPOS = game.currentPOS;
        prevWords = game.prevWords;
        wordsStack = game.wordsStack;
      }

      //Add player list data
      var playersList = [];

      data.user.find((err, users) => {
          if(err)
            throw err;

          users.forEach((user) => {
            if(user.score > 0){
              playersList.push({
                 name: user.name,
                 score: user.score,
                 photo: user.photo,
                 lastWord: user.lastWord
               });

            }

          });

          playersList.sort((a, b) => {
            return b.score - a.score;
          });


          res.send({
            currentWord: currentWord,
            currentDef: currentDef,
            currentPOS: currentPOS,
            prevWords: prevWords,
            playersList: playersList,
            wordsStack: wordsStack
          });
      });




    });
  });



  //======================
  //FACEBOOK LOG IN
  //======================
  app.get("/fb-login", passport.authenticate("facebook"));

  app.get("/fb-callback", passport.authenticate("facebook", {
                                                successRedirect: "/",
                                                failureRedirect: "/"
                                                }));

  app.get("/check-user-info", (req, res) => {
    if(req.user){
      data.user.findOne({facebookID: req.user.facebookID}, (err, user) => {
            if(err)
              throw err;

            if(!user){
              res.send("User is not in the database");
            }

            res.send({
              userName: req.user.name,
              photo_url: req.user.photo,
              score: user.score,
              facebookID: req.user.facebookID
            });

      });


    }
    else{
      res.send({
        error: "User not login yet"
      });
    }
  });

  //======================
  //LOG OUT
  //======================
  app.get("/logout", (req, res) => {
    if(req.user){
        req.logout();
        res.redirect("/")
    }

  });
};
