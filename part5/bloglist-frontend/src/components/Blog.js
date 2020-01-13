import React, { useState, useImperativeHandle } from 'react'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const [newBlog, setNewBlog] = useState([])
  // HandleUrlChange
  // onClick={() => console.log('clicked',JSON.stringify(blog))}
const handleChange = (event) => {
  console.log("Handle url Change",event.target.value)
  setNewBlog(newBlog.concat(event.target.value))
  setVisible(!visible)
}
  return (
    <div  style={blogStyle} onClick={handleChange} >
        {blog.title} {blog.author}
    </div>
  )

}
  


export default Blog