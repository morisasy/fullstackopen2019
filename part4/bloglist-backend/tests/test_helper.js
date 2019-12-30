
const Blog = require('../models/blog')
//  _id:Objectid("5e0540128ee3d04b09f9cb31"),


const initialBlogs = [
  {
    title:'You never fail until you stop trying',
    author:'albert stein',
    url:'htps://www.thebusiness.com/quoteoftheday',
    likes:1000,
  },
  {
    title:'Sunbath Trend',
    author:'Jim Kim',
    url:'www.thesun.com',
    likes:50,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author:'Removed',
    url:'htps://www.removed.com/info',
    likes:10
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
