const mongoose = require("mongoose");


// we define the schema for newuser
const chatSchema = new mongoose.Schema({
    from:{
        type:String,
        required: true,
    },
    to:{
        type:String,
        required: true,

    },
    msg:{
        type: String,
        maxLength : 500
    },
    created_at:{
        type:Date,
        required: true

    }
});


//creating model for our chat
const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;