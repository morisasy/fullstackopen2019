const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')


const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb+srv://fullstack:kinondoni@cluster0-2xns0.mongodb.net/bloglist?retryWrites=true&w=majority'


mongoose.connect(mongoUrl, {
    useUnifiedTopology: true,
     useNewUrlParser: true
    })
    .then(result => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message)
    });



morgan.token('type', function (req, res) {
    return req.headers['content-type']
})

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        JSON.stringify(req.body),
        JSON.stringify(req.body).length, '-',
        tokens['response-time'](req, res), 'ms', '-',
        tokens['type'](req, res)
    ].join(' ')
}))




app.use(cors())
app.use(bodyParser.json())

app.get('/api/blogs', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
})

app.post('/api/blogs', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

app.delete('/api/blogs/:id', (request, response, next) => {
   Blog.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

  app.put('/api/blogs/:id', (request, response, next) => {
    const blogContent = request.body

    Blog.findByIdAndUpdate(request.params.id, blogContent, { new: true })
      .then(updatedBlog => {
        response.json(updatedBlog.toJSON())
      })
      .catch(error => next(error))
  })

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})