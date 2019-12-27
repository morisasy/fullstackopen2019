/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


const initialBlogs = [
    

  {
    title:'You never fail until you stop trying',
    author:'albert stein',
    url:'htps://www.thebusiness.com/quoteoftheday',
    likes: 1000,
  },
  {
    title:'Sunbath Trend',
    author:'Jim Kim',
    url:'www.thesun.com',
    likes: 50
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('when there is initially some notes saved', () => {

  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('When blogs are returned with id but  not _id', async () => {
    const response = await api.get('/api/blogs/')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
    console.table(response.body)
  })



test('there are 2 blogs', async () => {
  const response = await api.get('/api/blogs')
  console.table(response.body)
  expect(response.body.length).toBe(initialBlogs.length)
})

test('the title of the first blog is You never fail until you stop trying ', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].author).toBe('albert stein')
})


test('a specific blog is within the returned blog', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)
  expect(contents).toContain('Sunbath Trend')
})

})

afterAll(() => {
  mongoose.connection.close()
})

