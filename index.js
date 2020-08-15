const Discord = require("discord.js");
const fs = require("fs");
const userRank = require('./getRank.js');
const namedRank = require('./convertRank.js');
const mongoose = require('mongoose');
const User = require('./models/User');
const signup = require('./signup.js')



require('./models/User');
require('dotenv').config({
    path: 'variables.env',
});

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});



const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

const prefix = "!";

client.on('ready', () => {
    console.log("Bot is up.");
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async function(message) { 
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
    
    const signupRegex = /([\w]+)#[0-9A-Za-z]+/;

    
    // TODO: Take the switch commands and break them into named functions and import them
    
    switch(command) {
        case "ping":
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message had a latency of ${timeTaken}ms.`); 
            break;
        case "signup":
            if (numArgs.length === 0){
                message.reply(`How can I sign you up if you didn't give me your id.... Dumbass. Format it like this: NAME#TAG`);
            }
            if (numArgs.length === 1 && args[0].match(signupRegex)){
                const discordname = message.author.username;
                const valorantid = args[0];
                const result = await signup.signup(discordname, valorantid);
                
                message.reply(`Adding you to the system ${result}`);
                
            }
            else {
                message.reply('uhhh dude thats not how you do it.... Format it like this: NAME#TAG');
            }
            break;
        case "rank": 
            if (numArgs.length === 0){
                message.reply('Whos rank do you want idiot? !rank DISCORDUSER');
            }
            if (numArgs.length === 1){
                // Check if user is in blitz, if not tell them to use !signMeUp NAME#TAG
                const rank = await userRank.getRank(args[0]);
                if (rank !== undefined){
                    message.reply(namedRank.convertRank(rank));
                }
                else {
                    message.reply('User Not Registered');
                }
            }
            break;
        case "ranks":
            // message.reply(`Do you even have blitzgg dud?`);
            const users = await userRank.getAllRanks();
            users.map( async (user) => {
                try {
                    const rank = await userRank.getRank(user.discordname);
                    if (rank !== undefined){
                        message.reply(`${user.discordname}'s rank is ${userRank.convertRank(rank)}`);
                        return;
                    }
                } catch (error) {
                    console.error(error);                    
                }
            })
            break;
        case "help":
            message.reply('Get Cucked kid.... jk try: \n !ping --> See bots ping if it is up and running \n !signup -> run it as !signup NAME#TAGNUM\n !rank --> run it as !rank DISCORDUSERNAME ');
            break;
        default:
            message.reply(`Bruh... don't be stupid... you know how to use a bot. try !help`);
            break;

    }
}); 
