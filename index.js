const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoPass = 'JC6AwLWockKxnJ5b';
const mongoUrl = `mongodb+srv://fullstack:${mongoPass}@cluster0-jzxa8.mongodb.net/bloglist?retryWrites=true&w=majority`;
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

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});