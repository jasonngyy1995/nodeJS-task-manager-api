const express = require('express')
const { findById } = require('../models/task')
const auth = require('../middleware/auth')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task (req.body)
    const task = new Task({
        // copy all properties from body over to this object
        ...req.body,
        owner: req.user._id
    })

    try { 
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=true
// limit = result get back for a given request
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=CreatedAt:desc
router.get('/tasks', auth, async (req, res) => { 
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        // ternary operator
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
    
        // find the user who's associated with the task
        // req.user.tasks -> the profile of the entire doc.
        // 'tasks' => path
        // await req.user.populate('tasks').execPopulate()

        await req.user.populate({
            path: 'tasks',
            match,
            options :{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {
                    // ascending: 1, descending: -1
                    // createdAt: 1
                    // completed: 1
                }
            }
        }).execPopulate()
        res.send(req.user.tasks)
   } catch (e) {
       res.status(500).send()
   }

})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid update'})
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)

    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router