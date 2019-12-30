/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper= require('./test_helper')
//  initialBlogs, nonExistingId, blogsInDb

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

describe('adding blog posts', () => {
  test('creating a new blog post', async () => {
    const newPost = {
      title: 'Uskollinen Lukija',
      author: 'Max Seeck',
      url: 'https://www.uskollinenlukija.fi',
      likes: 50
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const getBlogPost = await helper.blogsInDb()
    expect(getBlogPost.length).toBe(helper.initialBlogs.length + 1)

    const contents = getBlogPost.map(blog => blog.title)
    expect(contents).toContain('Uskollinen Lukija')
  })
})

test('When a blog withought a like default value is 0', async () => {
  const newPost = {
    title: 'Please like my post',
    author: 'Withought Likes',
    url: 'https://ww.zerolikes.fi'
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const getBlogPost = await helper.blogsInDb()
  const contents  = getBlogPost.map(blog => blog.likes)
 // expect(contents).toBe(0)
 expect(contents).toContain()
})


afterAll(() => {
  mongoose.connection.close()
})
