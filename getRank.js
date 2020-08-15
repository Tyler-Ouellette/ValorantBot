const mongoose = require('mongoose');
const axios = require('axios');
const User = require('./models/User');

const getRank = async (username) => {
    try {
        const user = await User.findOne({ discordname: username.toLowerCase() });
        const slug = 'https://valorant.iesdev.com/player/';
        const nametag = user.valorantid.replace('#', '-').replace(' ', '%20');
        const userUrl = slug + nametag.toLowerCase();
        
        try {
          const response = await axios.get(userUrl);
          return response.data.ranks.competitive.tier;
          
        } catch (error) {
          console.error(error);
        }
    } catch (error) {
        return "User Doesn't Exist";
    }
}

const getAllRanks = async () => {
    try {
        const allUsers = await User.find();
        return allUsers;
    } catch (err) {
        console.error(err);
    }
}

const convertRank = (rank) => {
    switch (rank) {
        case 0:  return `You are a pub scrub`;      break
        case 1:  return `You haven't played in a while`; break;
        case 2:  return `Plastic`;     break;
        case 3:  return `Iron 1`;      break;
        case 4:  return `Iron 2`;      break;
        case 5:  return `Iron 3`;      break;
        case 6:  return `Bronze 1`;    break;
        case 7:  return `Bronze 2`;    break;
        case 8:  return `Bronze 3`;    break;
        case 9:  return `Silver 1`;    break;
        case 10: return `Silver 2`;    break;
        case 11: return `Silver 3`;    break;
        case 12: return `Gold 1`;      break;
        case 13: return `Gold 2`;      break;
        case 14: return `Gold 3`;      break;
        case 15: return `Platinum 1`;  break;
        case 16: return `Platinum 2`;  break;
        case 17: return `Platinum 3`;  break;
        case 18: return `Diamond 1`;   break;
        case 19: return `Diamond 2`;   break;
        case 20: return `Diamond 3`;   break;
        case 21: return `Immortal 1`;  break;
        case 22: return `Immortal 2`;  break;
        case 23: return `Immortal 3`;  break;
        case 24: return `Valorant`;    break;
        default:
            return 'WTF did the api return?'; break;
    }
}

module.exports.getRank = getRank;
module.exports.getAllRanks = getAllRanks;
module.exports.convertRank = convertRank;
