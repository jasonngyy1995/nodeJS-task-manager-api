const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false     
    },
    owner: {
        // data stored in owner is an object ID
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // fetch user file
        ref: 'User'
    }
}, {
    timestamps: true
})
    

// const task_1 = new Task({
//     description: 'Add notes',
//     completed: true
// })


// const task_2 = new Task({
//     description: 'Check notes',
//     completed: false
// })


// task_1.save().then(() => {
//     console.log(task_1)
//     task_2.save()
// }).catch((e) => {
//     console.log(e)
// })

const Task = mongoose.model('Task', taskSchema)

module.exports = Task