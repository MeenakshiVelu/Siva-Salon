const express = require("express")
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');


router.get("/login", forwardAuthenticated, (req, res) => {
    res.render('login');
})

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});


router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));


router.post("/register", (req, res) => {
    // res.json(req.body);
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    req.flash('success_msg', 'You are now registered and can log in');
                    res.redirect('/users/login');
                })
                .catch(err => console.log(err));
        })

    })

})


router.get('/forgotpassword', (req, res) => {
    res.render("forgotpassword");
});

router.post('/forgotpassword', (req, res) => {
    console.log("below")
    console.log(req.body)
    User.findOne({ email: req.body.email }, (err, obj) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("suuc", obj)
        }
        if (obj) {
            console.log("hjkhkjk", obj)
            res.json({ msg: "Success" });


        }
        else {
            req.flash('error_msg', "Sorry please enter a registered email");
            // res.redirect("/users/forgotpassword")
            // res.send({ msg: req.flash(error_msg)});
            res.status(200).send({ result: 'redirect', url: '/users/forgotpassword' })
        }
    })

    // res.render("forgotpassword");
});

router.put('/forgotpassword/', async (req, res) => {
    console.log("put");
    // console.log(req.params.val);
    console.log(req.body);
    console.log(req.body.password);

    //  await User.findOneAndUpdate({ email: req.body.email }, {name :"Meenakshi Velu"});
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
            if (err) throw err;
            // let pwd = hash;
            // newUser.password = hash;
            // await User.findOneAndUpdate({ email: req.body.email }, {password :hash});
            await User.findOneAndUpdate({ email: req.body.email }, { password: hash }, { useFindAndModify: false });
            console.log("done database")
            req.flash("success_msg", "Your password is updated successfully");

            return res.status(200).send({ result: 'redirect', url: '/users/login' })
        })
    })
    // res.status(404).send({ result: 'fail', url: '/users/login' })


    // res.render("forgotpassword", req.flash("success_msg"));
    // res.redirect("/users/login");
    // res.json({msg:"hhhhh"});
    // res.json({msg : req.flash("success_msg")});





})


router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});


module.exports = router