const dummy = (blogs) => {
    return blogs.length;
  }

  const reducer = (sum, item) => {
    return sum + item.likes
  }
  // totalLikes = blogList.reduce((sum, blog) => { return sum + blog.likes},0)
  const totalLikes = array => {
   const result=  array.reduce(reducer, 0)
   return result
  }

  // get max likes
//const maxLikes = Math.max(...blogList.map(blog => blog.likes))
//console.log('Max like', maxLikes)


// Get the object liked most
const favoriteBlog = (items, max) => {
  const favoriteItem = items.find(item => item.likes === max)
  let favoriteBlogPost = {}
  favoriteBlogPost['title'] = favoriteItem.title
  favoriteBlogPost['author'] = favoriteItem.author
  favoriteBlogPost['likes'] = favoriteItem.likes
  return favoriteBlogPost
}
//console.log('blog most liked', favoriteBlog)
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }