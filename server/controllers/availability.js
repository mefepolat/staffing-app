const User = require('../models/user');


module.exports.addAvailability = async (req,res,next) => {
    const {user, shift, date} = req.body;
    if(!shift || shift !== 'd' || 'e' || 'n'){
        return res.json({message: 'Invalid shift entry!'});
    };
    const userAvailability = await User.findById(user._id);
    if(!userAvailability){
        return res.json({message: 'User not found!'})
    };
    
    userAvailability.availabilities.push({
        date: date,
        availability: shift
    })
    await userAvailability.save();
}