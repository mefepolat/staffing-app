const User = require('../models/user');
const Shift = require('../models/shift');
const e = require('express');


module.exports.seniorityBasedSort = async (date, shift) => {
    const employees = await User.find({ availabilities: { $elemMatch: { date: date, availability: shift} } })
                          .sort({ seniority: -1 })
                          .exec();
    if(!employees){
        return console.log('no employees found!')
    }
    return employees;
}