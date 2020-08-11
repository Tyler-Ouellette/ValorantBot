const mongoose = require('mongoose')
const User = mongoose.model('User');

const signup = async (discordname, valorantid) => {
    
    try {
        await new User({ discordname, valorantid}).save();
    //     await User.insert(user);
    } catch (error) {
        return "Failed because " + error.message;
    }
    return "Successful";
}

module.exports.signup = signup;
