const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


const initialBlogs = [
    

  {
    title:"You never fail until you stop trying",
    author:"albert stein",
    url:"htps://www.thebusiness.com/quoteoftheday",
    likes: 1000,
  },
  {
    title:"Sunbath Trend",
    author:"Jim Kim",
    url:"www.thesun.com",
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

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('there are 2 blogs', async () => {
  const response = await api.get('/api/blogs')
  //console.log(" blogs: ", response)
  expect(response.body.length).toBe(initialBlogs.length)
})

test('the title of the first blog is You never fail until you stop trying ', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].author).toBe('albert stein')
})


test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)
  expect(contents).toContain('Sunbath Trend')
})

afterAll(() => {
  mongoose.connection.close()
})


/*



test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')
  console.log(" blogs: ", response)

  expect(response.body.length).toBe(6)
})

test('the title of the first blog is Sunbath Trend ', async () => {
  const response = await api.get('/api/blogs')
  console.log(" blogs: ", response)

  expect(response.body[0].author).toBe('Jim Kim')
})

*/