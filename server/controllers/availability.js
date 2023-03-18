const User = require('../models/user');


module.exports.addAvailability = async (req,res,next) => {
    const {user, shift, date} = req.body;
    const userAvailability = User.findById(user._id);
    if(!userAvailability){
        return res.json({message: 'User not found!'})
    };
    userAvailability.availabilities.push({
        date: date,
        availability: shift
    })
}