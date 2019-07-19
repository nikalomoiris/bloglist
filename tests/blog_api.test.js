const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog);
        await blogObject.save();
    }
});

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('blogs have a property named "id"', async () => {
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

    const finalBlogs = await helper.blogsInDb();

    expect(helper.initialBlogs.length + 1).toBe(finalBlogs.length);
});

test('posting a blog without likes property defaults to 0 likes', async () => {
    const newBlog = {
        title: 'My sixth Blog post',
        author: 'Me and you and him',
        url: 'www.piiiiiiidd.com'
    };

    const postedBlog = await api.post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    expect(postedBlog.body.likes).toBe(0);
});

afterAll(() => {
    mongoose.connection.close();
});