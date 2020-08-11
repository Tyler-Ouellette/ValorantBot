const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new Schema({
    discordname: {
        type: String,
        required: true
    },
    valorantid: {
        type: String,
    }
});


userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);