import React from 'react'
import Blog from './Blog';
const Display = ({blogs}) => {

  const show = () =>  blogs.map(blog =><Blog key={blog.id}  blog={blog} />)

  
  return (
    <div className = "showblog">
      {show()}
    </div>
  )

}
  


export default Display