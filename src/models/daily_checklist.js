const mongoose = require('mongoose')
const validator = require('validator')

const Daily_checklist = mongoose.model('Daily_checklist', {
    to_do: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean
    }    
})

module.exports = Daily_checklist