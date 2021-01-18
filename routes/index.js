const express = require("express");
const router = express.Router();
const Message = require('../models/Message');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


router.get("/about", (req, res) => {
    res.render("about");
})
router.get("/services", (req, res) => {
    res.render("services");
})
router.get("/contact", (req, res) => {
    res.render("contact", { msg: "" })
})
router.post("/contact", async (req, res) => {
    // console.log(req.body);
    const msg = new Message({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        query: req.body.query

    })
    await msg.save();
    req.flash("success_msg", "Thank you")
    //  res.render("contact", { msg: "Thank you for your interest. We will get in touch shortly." })
    res.render("contact", { msg: req.flash("success_msg") })
})

router.get("/news", (req, res) => {
    res.render("news");
})


router.get("/dashboard", ensureAuthenticated, async (req, res) => {
    const msg = await Message.find().lean()

    res.render("dashboard", { msg: msg });
})


router.delete("/dashboard/:id", async (req, res) => {
    // console.log(req.params.id);
    await Message.findByIdAndRemove(req.params.id, async (err, doc) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("removed user", doc)
        }

        const msg = await Message.find().lean();
        if (msg) {

            res.render("dashboard", { msg: msg });
            return;
        }
        else {
            console.log("error happended")
        }

    })

})

router.get("/products", (req, res) => {
    res.render("products");
})
router.get("/admin", (req, res) => {
    res.render("admin");
})

module.exports = router;