const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')

mongoose.set('useFindAndModify', false)

// TEST_MONGODB_URI
logger.info('connecting to', TEST_MONGODB_URI)
//logger.info('connecting to', config.MONGODB_URI)
// mongoose.connect(config.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connect(MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })


app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;