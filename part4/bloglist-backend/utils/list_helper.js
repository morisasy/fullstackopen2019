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
const maxLikes = Math.max(...blogList.map(blog => blog.likes))
console.log('Max like', maxLikes)

// Get the object liked most
const favoriteBlog = (items, max) => {
  const favoriteItem = items.find(item => item.likes === max)
  return favoriteItem
}
console.log('blog most liked', favoriteBlog)
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }