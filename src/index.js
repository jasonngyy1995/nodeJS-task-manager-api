// sendgrid password : 12345678910abcdef

const express = require('express')
require('./db/mongoose')
const Daily_checklist = require('./models/daily_checklist')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
// for heroku deployment or localhost
const port = process.env.PORT

// example of using multer
const multer = require('multer')
const upload = multer({
    dest: 'images',
    limit: {
        fileSize: 1000000
    }, 
    // cb = callback
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a MS word doc'))
        }

        cb(undefined, true)


        //  cb(new Error('File must be a PDF'))
        //  // if upload is expected
        //  cb(undefined, true)
        //  // silently reject
        //  cb(undefined, false)
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send( {error: error.message} )
})

// upload.single('upload') -> tell multer to look for a file calls upload when the request comes in
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// })

// automatically parse incoming json
app.use(express.json())

// register the router
app.use(userRouter)
app.use(taskRouter)

// Without middleware: new request -> run router handler
//
// With middleware -> do sth -> run route handler

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const main = async () => {
//     const task = await Task.findById('6034777c7b1f5f471b2e5e16')
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)
// }

// const User = require('./models/user')
// const Task = require('./models/task')

// const main = async () => {
//     const user = await User.findById('60347d4b8da72947a0b17e5b')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     // return an authentication token
//     // sign(object, string)
//     const token = jwt.sign({ _id: 'abc'}, 'thisismynewcourse', { expiresIn: '7 days'} )
//     console.log(token)

//    const data = jwt.verify(token, 'thisismynewcourse')
//    console.log(data)
// }

// myFunction()