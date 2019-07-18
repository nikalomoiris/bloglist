const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
    console.log('Retrieving blog entries');
    const blogs = await Blog.find({});
    res.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', (req, res) => {
    const blog = new Blog(req.body);
    console.log('Creating new blog entry');
    console.log(blog);

    blog
        .save()
        .then(result => {
            console.log('Blog entry created');
            console.log(result);
            res.status(201).json(result);
        });
});

module.exports = blogsRouter;