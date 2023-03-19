const User = require('../models/user');


module.exports.addAvailability = async (req,res,next) => {
    const {user, shift, date} = req.body;
    if(!user){
        return res.json({message: 'You need to be logged in.'})
    }
    if(!shift || shift.toLowerCase() !== 'd' && shift !== 'e' && shift !== 'n'){
        console.log(shift)
        return res.json({message: 'Invalid shift entry!'});
    };
    
    const userAvailability = await User.findOne({_id: user._id});
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


module.exports.getAvailability = async (req,res,next) => {
    const {user} = req.body;
    if(!user){
        return res.json({message: 'You need to be logged in.'});
    }
    const userAvailabilities = await User.findById(user._id);

    return res.json(userAvailabilities.availabilities);
}