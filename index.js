const Discord = require("discord.js");
require('dotenv').config({
    path: 'variables.env',
});

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);
console.log("Bot is up.")

const prefix = "!";

client.on("message", function(message) { 
    //Ignore messages that come from bots
    if (message.author.bot) return;
    //Ignore anything that is not a command.
    if (!message.content.startsWith(prefix)) return;      
    
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    
    
    // if (command === "ping") {
    //     const timeTaken = Date.now() - message.createdTimestamp;
    //     message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);         
    // } 
    // else if (command === "sum") {
    //     const numArgs = args.map(x => parseFloat(x));
    //     const sum = numArgs.reduce((counter, x) => counter += x);
    //     message.reply(`The sum of all the arguments you provided is ${sum}!`);
    // }
    
    const numArgs = args.map(x => parseFloat(x));
    if (numArgs.length !== 0){
        const sum = numArgs.reduce((counter, x) => counter += x);
    }

    
    switch(command) {
        case "ping":
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message had a latency of ${timeTaken}ms.`); 
            break;
        case "sum":
            if (numArgs.length !== 0){
                message.reply(`The sum of all the arguments you provided is ${sum}!`);
            }
            message.reply(`Give me an arg dawg`);
            break;
        case "ranks":
            message.reply(`You want what?`);


            if (numArgs.length === 0){
                
            }
            if (numArgs === 1){
                message.reply(`The sum of all the arguments you provided is ${sum}!`);
                message.reply(`Your Args are: ${args[0]}, ${args[1]}`)
            }
            break;
        default:
            message.reply(`Bruh you broke it`);
            break;

    }
}); 
