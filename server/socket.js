module.exports = (server, io, data) => {
  io = require('socket.io').listen(server);

  io.sockets.on('connection', (socket) => {
      console.log("A user is connected");

      socket.on("UPDATE_GAME_DATA_SERVER", (dataUPDATE) => {
        data.gameData.findOne({gameID: "currentGame"}, (err, game) => {
          if(err)
            throw err;

          if(game.currentWord !== "" && dataUPDATE.currentWord[0] !== game.currentWord[game.currentWord.length  -1]){
              socket.emit("UPDATE_GAME_DATA_CLIENT", {
                updateStatus: false,
                reason: "You're too late. Someone already added their word."
              });

              return;
          }

          if(game.currentWord !== ""){
            game.wordsStack.push(game.currentWord);
          }

          if(game.wordsStack.length > 5){
            game.wordsStack = game.wordsStack.slice(1);
          }

          game.currentWord = dataUPDATE.currentWord;
          game.currentDef = dataUPDATE.currentDef;
          game.currentPOS = dataUPDATE.currentPOS;
          game.prevWords = dataUPDATE.prevWords;

          game.save();

          var playersList = [];

          data.user.find((err, users) => {
            if(err)
              throw err;

            users.forEach((user) => {
              if(user.facebookID === dataUPDATE.scoredPlayer_facebookID){
                user.score += dataUPDATE.currentWord.length;
                user.lastWord = dataUPDATE.currentWord;
              }
              else {
                user.score -= dataUPDATE.currentWord.length;
              }

              if(user.score < 0)
                user.score = 0;

              user.save();

              if(user.score > 0){
                playersList.push({
                  facebookID: user.facebookID,
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
            
            io.emit("UPDATE_GAME_DATA_CLIENT", {
              updateStatus: true,
              name: dataUPDATE.currentWord,
              definition: dataUPDATE.currentDef,
              POS: dataUPDATE.currentPOS,
              prevWords: dataUPDATE.prevWords,
              wordsStack: game.wordsStack,
              playersList: playersList
            });


            socket.emit("ADD_SCORE", {
              scoreAdded: dataUPDATE.currentWord.length
            });
          });



        });
      });
  });


};
