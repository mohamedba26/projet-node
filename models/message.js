const mongoose = require("mongoose")
const messageSchema = mongoose.Schema({
    message: { type: String, required: true },
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Categorie
    },
    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Categorie
    },
    seen: { type: Boolean, default: true },
    date:{type:Date}
})
module.exports = mongoose.model('message', messageSchema)