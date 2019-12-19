const listHelper = require('../utils/list_helper')
const {blogList} = require('./blog_for_test')


describe('Most Favorite blog in the blogList ', () => {
    test('favorite blog ', () => {
        const favoriteBlogToTEst = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        // get max likes
        const maxLikes = Math.max(...blogList.map(blog => blog.likes))
        console.log('Max like', maxLikes)
        const result = listHelper.favoriteBlog(blogList, maxLikes)
        expect(result).toEqual(favoriteBlogToTEst)
     
    })
  
    test('A blog with zero like ', () => {
        const blogWithZeroLike = {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            likes: 0
        }
        const noLikes = Math.min(...blogList.map(blog => blog.likes))
        const result = listHelper.favoriteBlog(blogList, noLikes)
        expect(result).toEqual(blogWithZeroLike)
    })
  
    test('of a blog post with only 2 likes', () => {
        const blogPost= {
            title: "Type wars",
            author: "Robert C. Martin",
            likes: 2
        }
        let likes = 2
        const result = listHelper.favoriteBlog(blogList, likes)
        expect(result).toEqual(blogPost)

    })
    test('when blogList is empty ', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual(null)
      })
      
  })



