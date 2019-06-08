const express = require("express");
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')
const bcrypt = require('bcrypt');
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");  

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(cookieSession({
  name: 'session',
  keys: ["key1, key2"], // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

// var urlDatabase = {
//   "b2xVn2": "http://www.lighthouselabs.ca",
//   "9sm5xK": "http://www.google.com"
// };

const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" }
};

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    //password: "purple-monkey-dinosaur"
    password: "$2b$10$UaeB4I1Bhx/SmerQvwmDUuP5H7oZTEUXG7lWwpF3TMQmSPEDugzme"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "vishnu", 
    //password: 123
    password: "$2b$10$aWEVAbbBMakMGMsn1xwq6eL6MF41Cuf/eHwV3a2Mp/N62whYHDkLC"
}
}

// Function to filter URLS as per
function urlsForUser(id) {
  let filteredUrls = {};
  for (let url in urlDfunction lookupHelper (email) {
  for (let lookupUser in users) {
    //console.log("Testing User already", users[lookupUser].email);
    if (email === users[lookupUser].email){
      return true;
    }
  }
}
    if (urlDatabase[urfunction lookupHelper (email) {
  for (let lookupUser in users) {
    //console.log("Testing User already", users[lookupUser].email);
    if (email === users[lookupUser].email){
      return true;
    }
  }
}
      filteredUrls[urlfunction lookupHelper (email) {
  for (let lookupUser in users) {
    //console.log("Testing User already", users[lookupUser].email);
    if (email === users[lookupUser].email){
      return true;
    }
  }
}
    }
  }
  return filteredUrls;function lookupHelper (email) {
  for (let lookupUser in users) {
    //console.log("Testing User already", users[lookupUser].email);
    if (email === users[lookupUser].email){
      return true;
    }
  }
}
}

function generateRandomString() {
    let shortURL = (Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0,6));
    return shortURL
}

function lookupHelper (email) {
  for (let lookupUser in users) {
    //console.log("Testing User already", users[lookupUser].email);
    if (email === users[lookupUser].email){
      return true;
    }
  }
}

app.get("/", (req, res) => {
  res.send("Welcome to the TinyURL app - type /urls - to proceed");
});

app.get("/urls", (req, res) => {
//console.log("my cookies", req.cookies)
  // const userId = req.cookies["user_id"];
  const userId = req.session.user_id;
  const user = users[userId];
  //let templateVars = { urls: urlDatabase, username: req.cookies.username};
  if(!user) {
    res.redirect("/login")
  } else {
  let templateVars = { urls: urlDatabase, user: user, filteredUrls: urlsForUser(userId)};
  res.render("urls_index", templateVars); // displays html in urls_index.ejs
  }
});

app.get("/urls/new", (req, res) => {
  // const userId = req.cookies["user_id"];
  const userId = req.session.user_id;
  const user = users[userId];

  let templateVars = {user: user};
  //console.log("This is the cookie", req.cookies.user_id);
  if (!userId){
    res.redirect("/login");
  } else {
    res.render("urls_new", templateVars);
  }
});

app.get("/register", (req, res) => {
  let templateVars = {};
  res.render("urls_register", templateVars);
});

app.get("/login", (req, res) => {
  let templateVars = {email: req.body.loginUser, password: req.body.password};
  res.render("urls_login", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  // const userId = req.cookies["user_id"];
  const userId = req.session.user_id;
  const user = users[userId];
  if (!user) {
    res.redirect("/login");
  } else {
  let templateVars = { shortURL: req.params.shortURL, longURLObj: urlDatabase[req.params.shortURL].longURL, user: user, filteredUrls: urlsForUser(userId)};
  res.render("urls_show", templateVars);
  }
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL].longURL;//urlDatabase[req.body.shortURL].longURL
  if (!longURL) {
    res.redirect('/urls')
  }
  res.redirect(longURL.includes('http') ? longURL : `http://${longURL}`);
});//problem is here

app.post("/urls", (req, res) => {

  const userId = req.session.user_id;
  const user = users[userId];

  let shortURL = generateRandomString();
  if (req.session.user_id && req.session.user_id in users) {
    urlDatabase[shortURL] = {
      longURL: req.body.longURLInput,
      userID : userId
    };
  res.redirect(`/urls/${shortURL}`);         // Respond with 'Ok' (we will replace this)
  }
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const userId = req.session.user_id;
  const user = users[userId];
  if (req.session.user_id && req.session.user_id in users) {
    //console.log("Deleted links =" +req.params.shortURL+":" +urlDatabase[req.params.shortURL]);
    delete urlDatabase[req.params.shortURL];
    res.redirect(`/urls`);
    }       
});

app.post("/urls/:shortURL", (req, res) => {
  urlDatabase[req.params.shortURL].longURL = req.body.longURLUpdate;
  res.redirect('/urls');         
});

app.post("/register", (req, res) => {
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
    const hashedPassword = bcrypt.hashSync(password, 10);
      users[newId] = {
        'id' : newId,
        'email' : email,
        'password' : hashedPassword
      } 
    req.session.user_id = newId;
    res.redirect(`/urls`);
  }
});

app.post("/login", (req, res) => {

  const enteredEmail = req.body.loginUser
  const enteredPswd =  req.body.password
  let loggedUser;
  for (let userId in users) {
    let user = users[userId]
    //console.log("entered user data", user.email)
  
    if (user.email === enteredEmail) {
      loggedUser = user;      
      }
  }
      
  // if (loggedUser === undefined) {
  //   res.status(400).send('User doesnt exist in database, Register!');
  //   return;
  // } else {
  //   res.cookie('user_id', loggedUser.id);
  //   res.redirect('/urls');  
  // }  
  
  if (loggedUser === undefined) {
    res.status(400).send('User doesnt exist in database, Register!');
  // } else if (loggedUser.password !== enteredPswd) {
  } else if (!bcrypt.compareSync(enteredPswd, loggedUser.password)) {
    res.status(400).send('Incorrect Password! Please try again!');
  }
    else {
      // res.cookie('user_id', loggedUser.id);
      req.session.user_id = loggedUser.id;
      res.redirect('/urls');
    }
});


app.post("/logout", (req, res) => {
  // res.clearCookie('user_id');
  req.session = null;
  res.redirect('/urls');         
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});