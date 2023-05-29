var express = require('express');
var router = express.Router();
const Message = require('../models/message');
router.get('/:senderId', async (req, res,) => {
    try {
        const messages = await Message.find({senderID:req.params.senderId,receiverID:req.body.receiverId}).sort({date:1});
        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
router.post('/', async (req, res) => {
    const { message, senderID, receiverID } = req.body;
    const newMessage = new Message({
        message: message,
        senderID: senderID,
        receiverID: receiverID,
        seen: false,
        date: new Date()
    })
    try {
        await newMessage.save();
        res.status(200).json(newMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.put('/:messageId', async (req, res) => {
    const id = req.params.messageId;
    try {
        var message=await Message.findById(id)
        message.seen=true
        await Message.findByIdAndUpdate(id,message);
        res.json(message);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
router.delete('/:messageId', async (req, res) => {
    const id = req.params.messageId;
    await Message.findByIdAndDelete(id);
    res.json({ message: "message deleted successfully." });
});
module.exports = router;
