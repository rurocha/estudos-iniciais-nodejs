const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    resetUserPasswordToken: String,
    resetPasswordsExpires: Date,
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
})

module.exports = mongoose.model('User', userSchema);