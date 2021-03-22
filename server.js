//Définition des modules
const express = require("express"); 
const mongoose = require("mongoose"); 
// const bodyParser = require('body-parser');

mongoose
  .connect("mongodb+srv://dbAdminUser:bWIf5jbVhdsJM5ww@clustersherlock.trfr9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((e) => {
    console.log("Error while DB connecting");
    console.log(e);
  });

//On définit notre objet express nommé app
const app = express();

//Body Parser
// const urlencodedParser = bodyParser.urlencoded({
//     extended: true
// });
// app.use(urlencodedParser);
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('client/build'));

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Définition du routeur
let routes = require("./api-routes");
app.use(routes);


//Définition et mise en place du port d'écoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// dbAdminUser
// bWIf5jbVhdsJM5ww