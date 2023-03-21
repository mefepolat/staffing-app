const User = require('../models/user');


module.exports.getEmployees = async (req,res,next) => {
    const employees = await User.find({});
    if(!employees){
        return res.json({message: 'There is an issue with the database.'});
    } else {
        return res.json({employees});
    }
}