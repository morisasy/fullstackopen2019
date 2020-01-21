import React from 'react'
import Blog from './Blog';
const BlogList = ({blogs, handleLike, handleDelete}) => {

  return (
    <div>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =><Blog 
                              key={blog.id}  
                              blog={blog} 
                              handleLike = {handleLike(blog.id)}
                              handleDelete = {handleDelete(blog.id)}
                        />)}
    </div>
     )    

}
/*
BlogList.propTypes = {
  blogs:React.PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}
*/
export default BlogList