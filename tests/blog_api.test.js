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

test('posting a blog without title property returns 400 Bad Request', async () => {
    const newBlog = {
        author: 'Me and you and him',
        url: 'www.piiiiiiidd.com',
        likes: 98
    };

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400);
});

test('posting a blog without url property returns 400 Bad Request', async () => {
    const newBlog = {
        title: 'My sixth Blog post',
        author: 'Me and you and him',
        likes: 98
    };

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400);
});

test('deleting a blog returns 204 Not Found', async () => {
    const blogsBeforeDelete = await helper.blogsInDb();
    const blogToDelete = blogsBeforeDelete[0];
    const idToDelete = blogToDelete.id;

    await api.delete(`/api/blogs/${idToDelete}`)
        .expect(204);

    const blogsAfterDelete = await helper.blogsInDb();
    expect(blogsBeforeDelete.length).toBe(blogsAfterDelete.length + 1);

    const titles = blogsAfterDelete.map(blog => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
});

afterAll(() => {
    mongoose.connection.close();
});