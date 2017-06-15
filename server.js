var express = require("express");
var bodyParser = require("body-parser");
var seeds = require("./data/friends.json"); 

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

// Static directory
app.use(express.static("./public"));

// Routes =============================================================
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function () {
  app.listen(PORT, function() {

    console.log("App listening on PORT " + PORT);

    db.User.findAll({}).then(function(friends) {
      if (!friends.length) {
        addFriend(seeds[0], 0);
      }
    });
    
    function addFriend(friend, i) {
      if (i === seeds.length) {
        return;
      }

      db.User.create(friend).then(function(newFriend) {
        // logic to make score object matching score table
        var score = {};
        console.log("newFriend ", newFriend); 
        for (let i = 0; i < friend.score.length; i++) {
          score["Question" + (i + 1)] = friend.score[i];
        } 

        var id = newFriend.id; 
        score.UserId = id; 
        
        db.Scores.create(score).then(function(newScore) {
          console.log("newScore ", newScore); 

            console.log("i before" + i); 
             
            i++;
            console.log("i after" + i); 
            addFriend(seeds[i], i);
          
        }); 
      });
    }
  });

});
