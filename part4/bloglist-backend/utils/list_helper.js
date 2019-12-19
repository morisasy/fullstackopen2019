const dummy = (blogs) => {
      return 1;
}

// count number of blog in a list
const blogCount = (blogs) => {
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


// Get the favorite blog 
const favoriteBlog = (items, max) => {
  if (items.length === 0) return null
  const favoriteItem = items.find(item => item.likes === max)
  let favoriteBlogPost = {}
  favoriteBlogPost['title'] = favoriteItem.title
  favoriteBlogPost['author'] = favoriteItem.author
  favoriteBlogPost['likes'] = favoriteItem.likes
  return favoriteBlogPost
}

// Get the most liked object
const mostLikes = (blogs, max) => {
  if (blogs.length === 0) return null
  const favoriteItem = blogs.find(blog => blog.likes === max)
  let favoriteBlogPost = {}
  favoriteBlogPost['author'] = favoriteItem.author
  favoriteBlogPost['likes'] = favoriteItem.likes
  return favoriteBlogPost
}

  
  module.exports = {
    dummy,
    blogCount,
    totalLikes,
    favoriteBlog,
    mostLikes
  }