const mongoose = require('mongoose');
const User = require('./models/User');

const getRank = async (username) => {
    const user = await User.find({ discordname: username });
    console.log(user);
   
   const slug = 'https://valorant.iesdev.com/player/';
   const userURL = user.valorantid.replace('#', '-');
   console.log(userURL);
   const userStats = await fetch(`${slug}${userURL}`);
   const rank = userStats.ranks.competitive.tier;
   
   return rank;
}

module.exports.getRank = getRank;
