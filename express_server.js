var express = require("express");
var app = express();
var PORT = 8080; // default port 8080

app.set("view engine", "ejs");

const bodyParser = require("body-parser");             //what does body parser do"????"
app.use(bodyParser.urlencoded({extended: true}));

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

function generateRandomString() {
    let shortURL = (Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0,6));
    return shortURL
}

app.get("/", (req, res) => {
    res.send("Welcome to the TinyURL app - type /urls - to proceed");
});

app.get("/urls", (req, res) => {
    let templateVars = { urls: urlDatabase }; 
    res.render("urls_index", templateVars); // displays html in urls_index.ejs
  });

  app.get("/urls/new", (req, res) => {
    res.render("urls_new");
  });

  app.post("/urls", (req, res) => {
    console.log(req.body);  // Log the POST request body to the console
    shortURL = generateRandomString();
    urlDatabase[shortURL] = req.body.longURL;
    //console.log('Database', urlDatabase); 
    res.redirect(`/urls/${shortURL}`);         // Respond with 'Ok' (we will replace this)
  });

  app.get("/urls/:shortURL", (req, res) => {
    let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
    res.render("urls_show", templateVars);
  });

  app.get("/u/:shortURL", (req, res) => {
    const longURL = urlDatabase[req.body.shortURL].longURL;
    console.log("my LongURL = ", longURL);
    res.redirect(longURL);
  });//problem is here

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});