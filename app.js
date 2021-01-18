const express = require('express');
const exphbs = require('express-handlebars');
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
const moment = require("moment");

const port = process.env.PORT || 5000;

const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
// const expressLayouts = require("express-ejs-layouts");
const db = require("./config/db").DBconnection;
const methodOverride = require('method-override');

const app = express();
require("./config/passport")(passport);

app.use(methodOverride('_method'));
const sessionStore = new MongoStore({ mongooseConnection : db, collection:"sessions"});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, '/views'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');



app.use(session({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: true,
    sessionStore : sessionStore,
    cookie:{
        maxAge :1000 *60 *60 *48
    }

}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });


app.use("/",require("./routes/index.js"))
app.use("/users",require("./routes/users.js"))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// app.listen(port, '192.168.1.2');

