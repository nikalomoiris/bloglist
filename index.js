const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true })
    .then(console.log('Connected to MongoDB'))
    .catch(error => {
        console.log('Connection to MongoDb', error.message);
    });

app.use(cors());
app.use(bodyParser.json());

app.get('/api/blogs', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs);
        });
});

app.post('/api/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog
        .save()
        .then(result => {
            res.status(201).json(result);
        });
});

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});