const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(()=>{
    console.log("connection successful");
})
.catch(err=> console.log(err));


//this function will wait till the connection is made with mongodb as it is asynchronous process 
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}

//filling database with some sample data
// 
let allChats= [
    {
        from:"Manisha",
        to:"Neha",
        msg:"She has taken your book.",
        created_at:new Date(),
    },
    {
        from:"Nitresh",
        to:"Pandey",
        msg:"This field is not so easy as we thought..",
        created_at:new Date(),
    },

    {
        from:"Priyanshu",
        to:"Gagana",
        msg:"You must read Bhagawat Gita.",
        created_at:new Date(),
    },

    {
        from:"Manish",
        to:"Priya",
        msg:"This is the time to do exercise.",
        created_at:new Date(),
    },

    {
        from:"Sanjay",
        to:"Bijay",
        msg:"Need help, just call me anytime!",
        created_at:new Date(),
    },


];

Chat.insertMany(allChats);