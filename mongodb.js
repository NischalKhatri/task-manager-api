//CRUD create read update delete
/*
Before running the app, run mongodb locally by entering the following code from the root directory -->
/Users/nickkhatri/Desktop/nodejs/mongodb/bin/mongod --dbpath=/Users/nickkhatri/Desktop/nodejs/mongodb-data
*/

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    //CRUD #1: C: Create data in database
    /* db.collection('users').insertOne({
        name: 'Leonardo',
        age: '1'
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user')
        }

        console.log(result)
    })

    db.collection('users').insertMany([
        {
            name: 'Sneji',
            age: '24'
        }, 
        {
            name: 'Leo',
            age: '2'
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents')
        }

        console.log(result)
    })

    db.collection('tasks').insertMany([
        {
            description: 'Complete node course',
            completed: false
        },
        {
            description: 'Complete type script course',
            completed: false
        },
        {
            description: 'Backup photos to external drive',
            completed: true
        }
    ], (error, result)=> {
        if (error) {
            return console.log('Unable to insert task documents')
        }

        console.log(result)
    }) */

    //CRUD #2: R: Read data from database
    /*db.collection('users').findOne({ _id: new ObjectID("63b462e9c86f8b63e095c968") }, (error, user) => {
        if (error) {
            return console.log('Unable to fetch!')
        }

        if(!user){
            return console.log('No user found with provided criteria!')
        }

        console.log(user)
    })

    db.collection('users').find({ age: "2" }).toArray((error, users) => {
        console.log(users)
    })

    db.collection('users').find({ age: "2" }).count((error, count) => {
        console.log(count)
    })

    db.collection('tasks').findOne( { _id: new ObjectID ("63b4616c8f0bca130f0bd296")}, (error, task) =>{
        if (error) {
            return console.log('Unable to fetch task')
        }

        console.log(task)
    })

    db.collection('tasks').find( {completed: false}).toArray((error, tasks) => {
        if (error) {
            return console.log('Unable to fetch tasks!')
        }

        console.log(tasks)
    })*/

    //CRUD #3: U: Update data in database
    /*db.collection('users').updateOne({ 
        _id: new ObjectId("63b43ad5b2e643a0e8e02103")
    }, {
        $rename: {
            "age": "agestring"
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
    db.collection('tasks').updateMany({
        completed: false
    },{
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })*/

    //CRUD #$: D: Delete data in database
    /*db.collection('users').deleteMany({
        age: '27',
        name: 'Nick'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('tasks').deleteOne({
        description: 'Complete node course'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })*/
})