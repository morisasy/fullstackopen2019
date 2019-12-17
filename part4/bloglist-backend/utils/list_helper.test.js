//const listHelper = require('../utils/list_helper')
const listHelper = require('./list_helper')
const {blogList} = require('./blog_for_test')


describe('total likes', () => {


  test('dummy returns one', () => {
  
      const blogs = [
        { _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0 }
      ]
      
      const result = listHelper.dummy(blogs)
      expect(result).toBe(1)
  })

 
  test('Total blogList likes equal to 36', () => {
    const result = listHelper.totalLikes(blogList)
    expect(result).toBe(36)
  })

  test('total number of blog in the blogList is six', () => {
    const result = listHelper.dummy(blogList)
    expect(result).toBe(6)
  })

  test('of empty blogList is zero', () => {
    const result = listHelper.dummy([])
    expect(result).toBe(0)
  })
})









