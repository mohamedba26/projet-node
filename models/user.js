const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true,unique:true},
    password: { type: String, required: true },
    numero: { type: Number, required: true },
    role: { type: Number, default: 1 },
    adress: { type: String, required:true }
})
module.exports = mongoose.model('user', userSchema)