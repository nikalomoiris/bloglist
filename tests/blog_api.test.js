const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('the blogs have a property named "id"', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
});

test('posting a blog increases the number of blogs saved', async () => {
    const initialBlogs = await api.get('/api/blogs');

    const newBlog = {
        title: 'My sixth Blog post',
        author: 'Me and you and him',
        url: 'www.piiiiiiidd.com',
        likes: 98
    };

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const finalBlogs = await api.get('/api/blogs');

    expect(initialBlogs.body.length + 1).toBe(finalBlogs.body.length);
});

afterAll(() => {
    mongoose.connection.close();
});