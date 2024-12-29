const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    task : {type: String , required : true},
    date : {type: String , required : true},
    createdBy : {type : String , required : true},
    completed : {type : Boolean , default : false},
    desc : {type: String , required : true},
    visibility : {type : Boolean , default : true}
})

module.exports = mongoose.model('Goal',goalSchema)