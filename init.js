const mongoose=require('mongoose');
const Chat=require('./models/chat');
main().then(() => {
    console.log("Connected to MongoDB");

    const sampleChats = [
        { from: "Akshay", to: "Kate", message: "Hello, how are you?" },
        { from: "Kate", to: "Akshay", message: "I'm good, thanks! How about you?" },
        { from: "Akshay", to: "Kate", message: "Doing well, working on a project." },
        { from: "Kate", to: "Akshay", message: "That's great! Need any help?" },
        { from: "Akshay", to: "Kate", message: "Maybe later, thanks!" },
        { from: "John", to: "Akshay", message: "Hey Akshay, are you coming to the meeting?" },
        { from: "Akshay", to: "John", message: "Yes, I'll be there in 10 minutes." },
        { from: "Kate", to: "John", message: "Don't forget to bring the documents." },
        { from: "John", to: "Kate", message: "Thanks for the reminder!" },
        { from: "Akshay", to: "Kate", message: "See you at lunch?" }
    ];

    Chat.insertMany(sampleChats)
        .then(result => {
            console.log("Chats saved:", result);
        })
        .catch(err => {
            console.log("Error saving chats:", err);
        });

}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}