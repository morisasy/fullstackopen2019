//const listHelper = require('../utils/list_helper')
const listHelper = require('./list_helper')
const blogList = require('./blog_for_test')

test('dummy returns one', () => {
  const blogs = [{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }]

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})