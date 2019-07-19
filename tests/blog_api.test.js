const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
    {
        title: 'One Blog post',
        author: 'Nikos',
        url: 'www.nikos.com',
        likes: 74
    },
    {
        title: 'Another Blog post',
        author: 'Georgia',
        url: 'www.georgia.com',
        likes: 98
    }
];

beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();

    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
});

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
    const newBlog = {
        title: 'My sixth Blog post',
        author: 'Me and you and him',
        url: 'www.piiiiiiidd.com',
        likes: 98
    };

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    const finalBlogs = await api.get('/api/blogs');

    expect(initialBlogs.length + 1).toBe(finalBlogs.body.length);
});

afterAll(() => {
    mongoose.connection.close();
});