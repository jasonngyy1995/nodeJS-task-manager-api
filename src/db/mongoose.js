const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    // to make sure when mongoose works with mongodb, our index are created allowing us to quickly access to the data
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

