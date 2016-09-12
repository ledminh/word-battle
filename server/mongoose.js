module.exports = (() => {
  var mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost:27017/wordBattle');

  var db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error: "));

  db.once('open', () => {
    console.log("Connected Mongo at port 27017");
  });

  var userSchema = mongoose.Schema({
    facebookID: String,
    score: Number,
    lastWord: String,
    name: String,
    photo: String
  });

  var gameDataSchema = mongoose.Schema({
    currentWord: String,
    currentDef: String,
    currentPOS: String,
    prevWords: String,
    gameID: String,
    wordsStack: []
  });

  var user = mongoose.model('user', userSchema);
  var gameData = mongoose.model('gameData', gameDataSchema);

  return {
    user,
    gameData
  };
})();
