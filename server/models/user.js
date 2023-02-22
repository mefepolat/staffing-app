const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    employer: {
        type: Boolean,
        default: false
    },
    employee: {
        type: Boolean,
        default: true
    },
    seniority: {
        type: Boolean
    },
    date: Date,
    availability: [
        {
          start_time: Number, // UNIX timestamp
          end_time: Number, // UNIX timestamp
          is_available: Boolean
        }
      ]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);