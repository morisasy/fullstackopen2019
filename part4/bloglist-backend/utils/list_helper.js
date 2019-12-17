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
  
  module.exports = {
    dummy,
    totalLikes
  }