import React from 'react'
import BlogDetail from './BlogDetail'
const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogRef = React.createRef();

  const handleToggleVisibility = () => {
    blogRef.current.toggleVisibility()
  }

  return (
   
     <div>
        <div style={blogStyle}  onClick={handleToggleVisibility}  >
                    {blog.title} {blog.author}
        </div>

        <BlogDetail
            blog={blog}
            ref={blogRef}
            handleLikeChange = {handleLike}
            
          />       
   </div>
  )

}
  


export default Blog