const Shift = require('../models/shift');
const User = require('../models/user');
const { seniorityBasedSort } = require('../utils/algorithms');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports.createShift = async () => {
    const {shift, executionTimeUnit, orderOfExecution, date} = req.body;
    const newShift = new Shift({
        shift_type: shift,
        date: date
    });
    await newShift.save();
    if(orderOfExecution === 'seniority'){
        try {
            const availableEmployees = await seniorityBasedSort(date, shift);
            for (const employee of availableEmployees){
                const message = `${shift} shift is available for ${date} this day. Are you available? REPLY WITH YES OR NO.`;
                await client.messages.create({
                    body: message,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: employee.phoneNumber
                }).then(message => console.log(message.sid))
                newShift.messagedEmployees.push(employee._id);
            }
        } catch(error) {
            console.log(error);
        }
        
    }
    
}

module.exports.receiveSms = async () => {
    const {From, Body} = req.body;
    console.log(`Received message from ${From}: ${Body}`);

    if(Body.trim().toLowerCase() === 'yes'){

    }
}