// const mongoose = require('mongoose');
const Discord = require("discord.js");
const fs = require("fs");


require('dotenv').config({
    path: 'variables.env',
});

// // Connect to our Database and handle any bad connections
// mongoose.connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
// mongoose.set('useCreateIndex', true);
// mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
// mongoose.connection.on('error', err => {
//     console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
// });

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

const prefix = "!";

client.on('ready', () => {
    console.log("Bot is up.");
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", function(message) { 
    //Ignore messages that come from bots
    if (message.author.bot) return;
    //Ignore anything that is not a bot command.
    if (!message.content.startsWith(prefix)) return;      
    
    //Slice index at length of prefix variable defined above
    const commandBody = message.content.slice(prefix.length);
    //On space command body, split on a space and add everything to args array
    const args = commandBody.split(' ');
    //take the command aspect only and lowercase that bitch just in case
    const command = args.shift().toLowerCase();
    
    const numArgs = args.map(x => parseInt(x));
    if (numArgs.length !== 0){
        const sum = numArgs.reduce((counter, x) => counter += x);
    }

    
    switch(command) {
        case "ping":
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message had a latency of ${timeTaken}ms.`); 
            break;
        case "signMeUp":
            if (numArgs.length === 0){
                message.reply(`How can I sign you up if you didn't give me your id.... Dumbass. Format it like this: NAME#TAGNUMBA`);
            }
            if (numArgs.length === 1 && args.match(/\w+#[0-9A-Za-z]+/)){
                fs.appendFile('blitzUsers.json', `${message.author.username}:${args[0]}`);
            }
            break;
        case "rank": 
            if (numArgs.length === 0){
                message.reply('Whos rank do you want idiot?');
            }
            if (numArgs.length === 1){
                // Check if user is in blitz, if not tell them to use !signMeUp NAME#TAG
            }
            break;
        case "ranks":
            message.reply(`Do you even have blitzgg dud?`);
            console.log(message.author.username);
            console.log(args[0]);
            

            if (numArgs.length === 0){
                
            }
            if (numArgs === 1){
                message.reply(`The sum of all the arguments you provided is ${sum}!`);
                message.reply(`Your Args are: ${args[0]}, ${args[1]}`)
            }
            break;
        case "help":
            message.reply('Get Cucked kid');
            break;
        default:
            message.reply(`Bruh... don't be stupid... you know how to use a bot`);
            break;

    }
}); 
