const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

describe('Test for users api when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const user = new User({ username: 'root', password: 'sekret' });
        await user.save();
    });

    test('creation succeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'nikos',
            name: 'Nikos Kalomoiris',
            password: 'helloworld'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('`username` to be unique');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    });
});


describe('Tests for the blogs api', () => {
    beforeEach(async () => {
        const creator = await helper.usersInDb();
        const creatorId = creator[0].id;
        await Blog.deleteMany({});

        for (let blog of helper.initialBlogs) {
            let blogObject = new Blog(blog);
            blogObject.userId = creatorId;
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

    // test('posting a blog increases the number of blogs saved', async () => {
    //     const creator = await helper.usersInDb();
    //     const creatorId = creator[0].id;
    //     const newBlog = {
    //         title: 'My sixth Blog post',
    //         author: 'Me and you and him',
    //         url: 'www.piiiiiiidd.com',
    //         likes: 98,
    //         userId: creatorId
    //     };

    //     await api.post('/api/blogs')
    //         .send(newBlog)
    //         .expect(200)
    //         .expect('Content-Type', /application\/json/);

    //     const finalBlogs = await helper.blogsInDb();

    //     expect(helper.initialBlogs.length + 1).toBe(finalBlogs.length);
    // });

    // test('posting a blog without likes property defaults to 0 likes', async () => {
    //     const creator = await helper.usersInDb();
    //     const creatorId = creator[0].id;
    //     const newBlog = {
    //         title: 'My sixth Blog post',
    //         author: 'Me and you and him',
    //         url: 'www.piiiiiiidd.com',
    //         userId: creatorId
    //     };

    //     const postedBlog = await api.post('/api/blogs')
    //         .send(newBlog)
    //         .expect(200)
    //         .expect('Content-Type', /application\/json/);
    //     expect(postedBlog.body.likes).toBe(0);
    // });

    // test('posting a blog without title property returns 400 Bad Request', async () => {
    //     const creator = await helper.usersInDb();
    //     const creatorId = creator[0].id;
    //     const newBlog = {
    //         author: 'Me and you and him',
    //         url: 'www.piiiiiiidd.com',
    //         likes: 98,
    //         userId: creatorId
    //     };

    //     await api.post('/api/blogs')
    //         .send(newBlog)
    //         .expect(400);
    // });

    // test('posting a blog without url property returns 400 Bad Request', async () => {
    //     const creator = await helper.usersInDb();
    //     const creatorId = creator[0].id;
    //     const newBlog = {
    //         title: 'My sixth Blog post',
    //         author: 'Me and you and him',
    //         likes: 98,
    //         userId: creatorId
    //     };

    //     await api.post('/api/blogs')
    //         .send(newBlog)
    //         .expect(400);
    // });

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

    test('updating a blog returns 200 OK', async () => {
        const creator = await helper.usersInDb();
        const creatorId = creator[0].id;
        const blogs = await helper.blogsInDb();
        const blogToUpdate = blogs[0];
        const idToUpdate = blogToUpdate.id;

        const updatedBlog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: 500,
            userId: creatorId
        };

        await api.put(`/api/blogs/${idToUpdate}`)
            .send(updatedBlog)
            .expect(200);
    });
});

afterAll(() => {
    mongoose.connection.close();
});