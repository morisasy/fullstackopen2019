import React from 'react'
import BlogDetail from './BlogDetail'
const Blog = ({ blog, handleLike , handleDelete}) => {
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
                   
                    <span className="title">{blog.title}</span> &nbsp;
                    <span className="author">{blog.author}</span>
        </div>

        <BlogDetail
            blog={blog}
            ref={blogRef}
            handleLikeChange = {handleLike}
            handleDelete = {handleDelete}
            
          />       
   </div>
  )

}

/*
Blog.propTypes = {
  blog:React.PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}
  */

export default Blog