//const listHelper = require('../utils/list_helper')
const listHelper = require('./list_helper')
const {blogList} = require('./blog_for_test')


describe('total likes', () => {


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
      expect(result).toEqual(1)
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


  test('favorite blogs ', () => {
    const favoriteBlogToTEst = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }

  // get max likes
const maxLikes = Math.max(...blogList.map(blog => blog.likes))
console.log('Max like', maxLikes)
    const result = listHelper.favoriteBlog(blogList, maxLikes)
    expect(result).toEqual(favoriteBlogToTEst)
  })
})









