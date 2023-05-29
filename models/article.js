const mongoose = require("mongoose")
const Scategorie = require("./scategorie.js");
const User = require("./user.js");
const articleSchema = mongoose.Schema({
    designation: { type: String, required: true},
    description: { type: String, required: false },
    prix: { type: Number, required: true },
    imagesart: { type: Array, required: true },
    scategorieID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Scategorie
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
})
module.exports = mongoose.model('article', articleSchema)