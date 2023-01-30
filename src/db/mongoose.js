const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
}, (error) => {
    if (error) {
        console.log("error is", error)
    } else {
        //console.log("mongodb is connected")
    }
})
mongoose.set('strictQuery', true);
