
const mongoose = require("mongoose");
require("dotenv").config();

// const connection = mongoose.createConnection("mongodb+srv://meena1234:meena1234@cluster0.1pocr.mongodb.net/fsiva?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
const connection = mongoose.createConnection(process.env.dbstring, {useNewUrlParser: true, useUnifiedTopology: true})

module.exports = { DBconnection: connection};