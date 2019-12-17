const {blogList} = require('./blog_for_test')


totalLikes = blogList.reduce((sum, blog) => { return sum + blog.likes},0)


console.log('list of blogs', blogList)

console.log('Total bloglist: ', blogList.length)
console.log('Total likes : ', totalLikes)