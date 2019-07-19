const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

logger.info('Connecting to ', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() =>
        logger.info('Connected to MongoDB'))
    .catch((error) =>
        logger.error('Connection to MongoDB failed', error.message));

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;