const express = require('express')
const app = express()
const port = process.env.PORT || 3000 
const path = require('path');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
app.use(cookieparser());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, '/public')))
const template_path = path.join(__dirname,"/templates/views") 
app.set('view engine','hbs')
app.set('views',template_path);
app.use(express.json());
require("./src/db/connection");
const register = require("./src/model/regschema");
const Register = require('./src/model/regschema');

app.get('/', (req, res) => {
  res.render('sort')
})
app.get('/sort', (req, res) => {
    res.render('sort')
})
app.get('/searching', (req, res) => {
  if (!req.cookies.sett) {
    res.render('login_page')
  }
  else{
    res.render('searching')
  }
})
app.get('/log-in', (req, res) => {
  res.render('login_page')
})


app.post("/register",async(req,res)=>{
  try {
      const registeruser = new register({
          firstname:req.body.fname,
          lastname:req.body.lname,
          password:req.body.password,
          username:req.body.username
      })
      res.cookie("sett",req.body.username);
      const registered = await registeruser.save();
      res.render('searching');
      // res.json({ "registration": 'success' });
    }catch (error) {
      console.log(error);
      res.render('login_page');
    }
})

app.post("/login",async(req,res)=>{
  try {
      const username = req.body.usernamelog;
      const password = req.body.passwordlog;
      const data = await Register.findOne({username:username})
      const isMatch = await bcrypt.compare(password,data.password);
      if (isMatch == true) {
          res.cookie("sett",req.body.username);
          res.render('searching');
          // res.json({ "log-in": 'success' });
        } else {
          res.render('login_page');
      }
  } catch (error) {
      res.render('login_page');
  }
}) 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
