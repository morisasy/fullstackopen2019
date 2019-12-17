const {blogList} = require('./blog_for_test')


totalLikes = blogList.reduce((sum, blog) => { return sum + blog.likes},0)
// get max likes
const maxLikes = Math.max(...blogList.map(blog => blog.likes))
console.log('Max like', maxLikes)

// Get the object liked most
const favoriteBlog = blogList.find(blog => blog.likes === maxLikes)
console.log('blog most liked', favoriteBlog)



console.log('list of blogs', blogList)

console.log('Total bloglist: ', blogList.length)
console.log('Total likes : ', totalLikes)