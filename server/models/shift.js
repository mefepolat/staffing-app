const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const shiftSchema = new Schema({
    start_date: Date,
    end_date: Date,
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