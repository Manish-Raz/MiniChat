const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");



app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
//this will tell express where the static files are located and they will be served from there only
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("connection successful");
})
.catch(err=> console.log(err));


//this function will wait till the connection is made with mongodb as it is asynchronous process 
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}


//index route where all chats will be 
app.get("/chats", async(req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs",{chats});

})

//new route
app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");
});

//create route
app.post("/chats",(req, res)=>{
    let {from, to, msg}= req.body;
    // we get those things from body of req
    //creating object - doc which we send to db
    let newChat = new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at: new Date(),
    });
    newChat.save().then(res=>{console.log("chat was saved")}).catch(err=>{console.log(err)});
    res.redirect("/chats");
});

//edit route
app.get("/chats/:id/edit",  async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
  
})

//update route
app.put("/chats/:id",async (req, res)=>{
    let {id}= req.params;
    //we are getting message from body
    let {msg:newMsg}= req.body;
    let updatedChat= await Chat.findByIdAndUpdate(
        id,
         {msg: newMsg}, 
        {runValidators: true, new:true}
        );

        //used runValidators to checks schema rules before updating
        console.log(updatedChat);
        res.redirect("/chats");
});

//destroy route
app.delete("/chats/:id", async (req,res)=>{
    let {id}= req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);

    res.redirect("/chats");
})

app.get("/",(req,res)=>{
    res.send("working set up is ready for lunch");
});

app.listen(8080, ()=>{
    console.log("server is listening on port 8080");
});