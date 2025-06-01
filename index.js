const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require('./models/chat');

app.use(express.urlencoded({ extended: true }));
main().then(() => {
    console.log("Connected to MongoDB");

}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}




app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})



app.post('/chats',(req,res)=>{

    let { from, to, message } = req.body;
    let newChat=new Chat ({
        from: from,
        to: to,
        message: message
    });
    Chat.insertOne(newChat).then(()=>{
        console.log("Chat saved successfully");
        res.redirect('/chats');
    })

})



app.get('/chats',async (req,res)=>{
   
    let chatContent=await Chat.find()
    res.render('index.ejs', { chats: chatContent });
})


app.get('/chats/new',(req,res)=>{
    res.render('new.ejs');
})

app.get('/chats/edit/:id',(req,res)=>{
    Chat.findById(req.params.id).then((chat)=>{
    
        res.render('editform.ejs', { chat: chat });
    })
})

app.post('/chats/edit/:id',(req,res)=>{
    let { from, to, message } = req.body;
    Chat.findByIdAndUpdate(req.params.id, {
        from: from,
        to: to,
        message: message
    }).then(()=>{
        console.log("Chat updated successfully");
        res.redirect('/chats');
    }).catch(err => {
        console.log("Error updating chat:", err);
        res.redirect('/chats');
    });
})



