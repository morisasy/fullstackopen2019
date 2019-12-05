const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(error => next(error))
  })


blogsRouter.get('/info', async (req, res, next) => {
  try {
    const totalBlog = await Blog.find({}).countDocuments();
    console.log(' Persons List:', totalBlog )
    res.send(`
          <p>The blog List  has info of ${totalBlog} blogs</p>
          <p>${new Date()}</p>
      `);
   } catch (error) {
    next(error)
  }
})

  blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
      .then(blog => {
        if (blog) {
          response.json(blog.toJSON())
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })
  
  blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))
  })
  
  blogsRouter.delete('/:id', (request, response, next) => {
     Blog.findByIdAndRemove(request.params.id)
        .then(blog => {
          if (blog) {
            //response.json(blog.toJSON())
            response.status(204).end()
          } else {
            response.status(404).end() 
          }
         
        })
        .catch(error => next(error))
    })
  
 blogsRouter.put('/:id', (request, response, next) => {
      const blogContent = request.body
  
      Blog.findByIdAndUpdate(request.params.id, blogContent, { new: true })
        .then(updatedBlog => {
          response.json(updatedBlog.toJSON())
        })
        .catch(error => next(error))
    })
  
module.exports = blogsRouter;