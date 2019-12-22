const {blogList} = require('./tests/blog_for_test')

const restaurants = [
    {
        name: "Dan's Hamburgers",
        price: 'Cheap',
        cuisine: 'Burger',
    },
    {
        name: "Austin's Pizza",
        price: 'Cheap',
        cuisine: 'Pizza',
    },
    {
        name: "Via 313",
        price: 'Moderate',
        cuisine: 'Pizza',
    },
    {
        name: "Bufalina",
        price: 'Expensive',
        cuisine: 'Pizza',
    },
    {
        name: "P. Terry's",
        price: 'Cheap',
        cuisine: 'Burger',
    },
    {
        name: "Hopdoddy",
        price: 'Expensive',
        cuisine: 'Burger',
    },
    {
        name: "Whataburger",
        price: 'Moderate',
        cuisine: 'Burger',
    },
    {
        name: "Chuy's",
        cuisine: 'Tex-Mex',
        price: 'Moderate',
    },
    {
        name: "Taquerias Arandina",
        cuisine: 'Tex-Mex',
        price: 'Cheap',
    },
    {
        name: "El Alma",
        cuisine: 'Tex-Mex',
        price: 'Expensive',
    },
    {
        name: "Maudie's",
        cuisine: 'Tex-Mex',
        price: 'Moderate',
    },
];

/*
    const isBurger = ({name}) => name === "Taquerias Arandina";
    const burgerJoints = restaurants.filter(isBurger);
  console.log ("cusine", burgerJoint)
  function minMax(items) {
     var minMaxArray = items.reduce(
        (accumulator, currentValue) => {
             return (accumulator < currentValue ? accumulator : currentValue);
        }
    );

     return minMaxArray;
 }

 const res = data.reduce((total,currentValue) => {
  return total + currentValue;
});
*/
const sumofLikes = (a, b) =>  a + b.likes

  // totalLikes = blogList.reduce((sum, blog) => { return sum + blog.likes},0)
const totalLikes = array => {
    const result=  array.reduce(sumofLikes, 0)
    return result
 }
 

const data = [5, 10, 15, 20, 25];

function minMax(items) {
    var minMaxArray = items.reduce(
       (accumulator, currentValue) => {
            return (accumulator < currentValue ? accumulator : currentValue);
       }
   );

    return minMaxArray;
}




console.log (" Result: ", minMax(data))


// Get the most blog

const filterHelper = (items, el) => items.filter(item => item.author === el.author)

// blogs.filter(blog => blog.author === a.author)

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  let mostBlog = blogs.reduce((a, b) => {
    return  filterHelper(blogs,a).length >= filterHelper(blogs,b).length ? a : b
  }, blogs[0])
  return {
    author: mostBlog.author,
    blogs: filterHelper(blogs, mostBlog).length
  }
}

console.log (" Most blog: ", mostBlogs(blogList))




const mostLikes = (blogs) => {
    if (blogs.length === 0) return null
    // Get a blog with most likes
    let blogWithMostLikes = blogs.reduce((a, b) => a.likes > b.likes ? a : b )
   //let blogWithMostLikes = favoriteBlog(blogs)
  
    // Get a blogList of blogger with most likes
    let mostLikesListBlog= filterHelper(blogs, blogWithMostLikes)
    //let totalLikes = blogs.reduce((a, b) => a.likes + b.likes)
    //newBlog ['likes'] = totalLikes(mostLikesListBlog)
    // newBlog ['likes'] = mostLikesListBlogger.reduce((a, b) => a.likes + b.likes)
    console.log("most like blogList: ", mostLikesListBlog)
    let newBlog = {}
    newBlog ['author'] = blogWithMostLikes.author
    //newBlog ['likes'] = mostLikesListBlog.reduce((a, b) => a.likes + b.likes)
    return newBlog
  }

  console.log (" Mostlike blog: ", mostLikes(blogList))
  