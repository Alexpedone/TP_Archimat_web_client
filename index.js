var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ici faut faire faire quelque chose à notre app...
// On va mettre les "routes"  == les requêtes HTTP acceptéés par notre application.

app.get("/", function(req, res) {
  res.send("Hello")
})

// Test part -------------------
app.get('/test/*', function(req, res) {
    //ici construire la réponse HTTP
  res.json({"msg": req.url.substr(6)})
});

let compteur = {"count": 0};

app.get('/cpt/query', function(req, res) {
  res.json(compteur)
});

app.get('/cpt/inc*', function(req, res){
  if (req.query.v !== undefined){
    if (req.query.v.match(/^[0-9]+$/)){
      compteur.count += parseInt(req.query.v)
    } else {
      res.json({"code" : -1})
    }
  } else {
    compteur.count += 1
  }
});
// End Test part -------------------

// var allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"];

var allMsgs = [
  { "msg": "Hello World", "date": "06/03/2026 15:15:59", "pseudo": "Alice" },
  { "msg": "foobar", "date": "06/03/2026 15:16:10", "pseudo": "Bob" },
  { "msg": "CentraleSupelec Forever", "date": "06/03/2026 15:17:03", "pseudo": "Charlie" }
];

app.get('/msg/get/*', function(req, res){
  let id = parseInt(req.url.substr(9));
  if (!isNaN(id) && id >= 0 && id < allMsgs.length){
    res.json({ "code": 1, "msg" : allMsgs[id] })
  } else {
    res.json({ "code": 0})
  }
});

app.get('/msg/nbr', function(req, res){
   res.json(allMsgs.length)
});

app.get('/msg/getAll',  function(req,res){
  res.json(allMsgs)
});

// app.get('/msg/post/*', function(req, res) {
//   const newMsg = unescape(req.url.substr(10));
//   allMsgs.push(newMsg);
//   res.json({"code": 1, "id": allMsgs.length - 1});
// });

app.get('/msg/post/*', function(req, res) {
  const parts = unescape(req.url.substr(10)).split('|');
  const newMsg = {
    "msg": parts[0],
    "pseudo": parts[1] || "Anonyme",
    "date": new Date().toLocaleString()
  };
  allMsgs.push(newMsg);
  res.json({"code": 1, "id": allMsgs.length - 1});
});

app.get('/msg/del/*', function(req, res) {
  const id = parseInt(req.url.substr(9));
  if (!isNaN(id) && id >= 0 && id < allMsgs.length) {
    allMsgs.splice(id, 1);
    res.json({"code": 1});
  } else {
    res.json({"code": 0});
  }
});



app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");

