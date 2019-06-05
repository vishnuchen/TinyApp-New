var express = require("express");
var cookieParser = require('cookie-parser')
var app = express();
var PORT = 8080; // default port 8080


app.set("view engine", "ejs");

const bodyParser = require("body-parser");             //what does body parser do"????"
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

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
  //console.log("my cookies", req.cookies)
    let templateVars = { urls: urlDatabase, username: req.cookies.username};
    res.render("urls_index", templateVars); // displays html in urls_index.ejs
  });

  app.get("/urls/new", (req, res) => {
    let templateVars = {username: req.cookies.username };
    res.render("urls_new", templateVars);
  });

  app.post("/urls", (req, res) => {
    //console.log(req.cookies); 
    shortURL = generateRandomString();
    urlDatabase[shortURL] = req.body.longURLInput;
    //console.log('Database after updating', urlDatabase); 
    res.redirect(`/urls/${shortURL}`);         // Respond with 'Ok' (we will replace this)
  });

  app.post("/urls/:shortURL/delete", (req, res) => {
    delete urlDatabase[req.params.shortURL];
    res.redirect('/urls');         
  });

  app.post("/urls/:shortURL", (req, res) => {
    urlDatabase[req.params.shortURL] = req.body.longURLUpdate;
    res.redirect('/urls');         
  });

  app.post("/login", (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/urls');         
  });

  app.post("/logout", (req, res) => {
    res.clearCookie('username');
    res.redirect('/urls');         
  });

  app.get("/urls/:shortURL", (req, res) => {
    let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], username: req.cookies.username};
    res.render("urls_show", templateVars);
  });

  app.get("/u/:shortURL", (req, res) => {
    const longURL = urlDatabase[req.params.shortURL];//urlDatabase[req.body.shortURL].longURL
    //console.log("My LongURL", longURL)
    //console.log("My Short URL", req.params.shortURL)

    if (!longURL) {
      res.redirect('/urls')
    }

    res.redirect(longURL.includes('http') ? longURL : `http://${longURL}`);
  });//problem is here

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});