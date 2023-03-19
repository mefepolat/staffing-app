const User = require('../models/user');


module.exports.addAvailability = async (req,res,next) => {
    const {user, shift, date} = req.body;
   
    if(!shift || shift !== 'd' || 'e' || 'n'){
        return res.json({message: 'Invalid shift entry!'});
    };
    const userAvailability = await User.findOne({_id: user._id});
    console.log(userAvailability)
    if(!userAvailability){
        return res.json({message: 'User not found!'})
    };
    
    userAvailability.availabilities.push({
        date: date,
        availability: shift
    })
    await userAvailability.save();
    console.log(userAvailability);
}