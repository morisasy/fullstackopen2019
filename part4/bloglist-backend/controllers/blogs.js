const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user')
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.get('/info', async (req, res, next) => {
  try {
    const totalBlog = await Blog.find({}).countDocuments()
    console.log('Persons List:', totalBlog )
    res.send(`
            <p>The blog List  has info of ${totalBlog} blogs</p>
            <p>${new Date()}</p>
        `)
  } catch (error) {
    next(error)
  }
})

blogsRouter.get('/:id', async(request, response, next) => {

  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }

})

blogsRouter.post('/', async(request, response, next) => {

  try {
    const body = request.body
    const user = await User.findById(body.userId)

    if (body.title === undefined && body.url === undefined) {
      return response.status(400).json({ error: 'title or url is missing' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async(request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async(request, response, next) => {
  const blogContent = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogContent, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter