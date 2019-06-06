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

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "vishnu", 
    password: "123"
  }
}

function generateRandomString() {
    let shortURL = (Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0,6));
    return shortURL
}

app.get("/", (req, res) => {
    res.send("Welcome to the TinyURL app - type /urls - to proceed");
});

app.get("/urls", (req, res) => {
  //console.log("my cookies", req.cookies)

    const userId = req.cookies["user_id"];
    const user = users[userId];
    //let templateVars = { urls: urlDatabase, username: req.cookies.username};
    let templateVars = { urls: urlDatabase, user: user};
    res.render("urls_index", templateVars); // displays html in urls_index.ejs
  });

  app.get("/urls/new", (req, res) => {
    let templateVars = {user: req.cookies["user_id"]};
    res.render("urls_new", templateVars);
  });

  app.get("/register", (req, res) => {
    let templateVars = {};
    res.render("urls_register", templateVars);
  });

  app.get("/login", (req, res) => {
    let templateVars = {email: req.body.loginUser, password: req.body.password};
    res.render("urls_login", templateVars);
  });

  function lookupHelper (email) {
    for (let lookupUser in users) {
      //console.log("Testing User already", users[lookupUser].email);
      if (email === users[lookupUser].email){
        return true;
      }
    }
  }


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

  app.post("/register", (req, res) => {
    // console.log("my entered password", req.body.password)
    // console.log("my entered password", req.body.password === "")
    // console.log("my entered password", req.body.password === undefined)
    // console.log("my entered password", typeof req.body.password)
    if (req.body.email === '') {
      res.status(400).send('Username empty')
    }   
    else if (req.body.password === "") {      
      res.status(400).send('password empty')
    }
    else if (lookupHelper(req.body.email)){
      res.status(400).send("Username already exists. Try another.");
    }
   else 
    {
      const newId = generateRandomString();
      const email = req.body.email;
      const password = req.body.password;
        users[newId] = {
          'id' : newId,
          'email' : email,
          'password' : password
        } 
      res.cookie('user_id', newId)
      res.redirect(`/urls`);
      console.log("My new appended data", users)
    }
  });

  app.post("/login", (req, res) => {

    const enteredEmail = req.body.loginUser
    const enteredPswd =  req.body.password
    let loggedUser;
    for (let userId in users) {
      let user = users[userId]
      console.log("entered user data", user.email)
        if (user.email === enteredEmail && user.password === enteredPswd) {
        loggedUser = user;
        console.log("loggeduser id", loggedUser)       
        }
    }
        
    if (loggedUser === undefined) {
      res.status(400).send('User doesnt exist in database, Register!');
      return;
    } else {
      res.cookie('user_id', loggedUser.id);
      res.redirect('/urls');  
    }

    
           
  });


  app.post("/logout", (req, res) => {
    console.log(res.cookies)
    res.clearCookie('user_id');
    res.redirect('/urls');         
  });

  app.get("/urls/:shortURL", (req, res) => {
    let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], user: req.cookies["user_id"]};
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