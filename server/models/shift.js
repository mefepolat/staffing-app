const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const shiftSchema = new Schema({
    date: Date,
    shift_type: String,
    requiredEmployees: Number,
    approvedEmployees:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messagedEmployees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
    
});


module.exports = mongoose.model('Shift', shiftSchema);