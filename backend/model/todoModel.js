const mongoose = require('mongoose')
const {Schema} = mongoose

const todoSchema = new Schema({
    task:{
        type : String,
        required : true
    },
    status:{
        type : String,
        enum : ['pending','active','block'],
        default : 'pending'
    },
    priority:{
        type : String,
        enum : ['high','low','medium'],
        required : true
    }
})

module.exports = mongoose.model('Todo', todoSchema)