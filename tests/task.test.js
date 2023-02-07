const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { 
    userOneId, 
    userOne,
    userTwoId,
    userTwo, 
    setupDatabase, 
    taskOne
 } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for User', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)

    // Assetions that task was created in db
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.description).toEqual('From my test')
    expect(task.completed).toBe(false)
})

test('Should get correct task for the user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // Assetions that response length is equal to length in database
    expect(response.body.length).toEqual(2)
})

test('Should not delete first user task by second user', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    // Assetions that task is still in databse
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
    expect(task._id).toEqual(taskOne._id)
})

test('Should not create task with invalid completed', async () => {
    await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
            completed: 'hello'
        })
        .expect(400)
})

test('Should not update task with invalid completed', async () => {
    await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            completed: 'hello'
        })
        .expect(400)
})

test('Should delete user task', async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not delete task if unauthenticated', async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .send()
        .expect(401)
})

test('Should not update other users task', async () => {
    await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
            completed: true
        })
        .expect(404)
})

test('Should fetch user task by id', async () => {
    await request(app)
        .get(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not fetch user task by id if unauthenticated', async () => {
    await request(app)
        .get(`/tasks/${taskOne._id}`)
        .send()
        .expect(401)
})

test('Should not fetch other users task by id', async () => {
    await request(app)
        .get(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
})

test('Should fetch only completed tasks', async () => {
    await request(app)
        .get('/tasks?completed=true')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // Assertions that only completed tasks are pulled
    const tasks = await Task.find({ completed: true, owner: userOneId })
    expect(tasks.length).toBe(1)
})

test('Should fetch only incomplete tasks', async () => {
    await request(app)
        .get('/tasks?completed=false')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // Assertions that only completed tasks are pulled
    const tasks = await Task.find({ completed: false, owner: userOneId })
    expect(tasks.length).toBe(1)
})

test('Should sort tasks by createdAt', async () => {
    await request(app)
        .get('/tasks?sortBy=createdAt:asc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should fetch page of tasks', async () => {
    const response = await request(app)
        .get('/tasks?limit=1')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // Assetions that page is fetched
    expect(response.body.length).toBe(1)
})