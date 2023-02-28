const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  employmentType: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  employer: {
    type: Boolean,
    default: false,
  },
  employee: {
    type: Boolean,
    default: true,
  },
  seniority: {
    type: Boolean,
  },
  availabilities: [
    {
      date: Date,
      availability: String,
      time: String,
      status: {
        type: Boolean,
        default: false
      }
    },
  ],
  shifts: [{
    type: Schema.Types.ObjectId,
    ref: 'Shift'
  }]
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
