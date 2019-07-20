const Blog = require('../models/blog');
const User = require('../models/user');

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

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' });
    await blog.save();
    await blog.remove();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
};

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
};