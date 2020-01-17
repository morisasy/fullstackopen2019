import React, { useState, useImperativeHandle } from 'react'
import Button from './Button'


const BlogDetail = React.forwardRef((props, ref) => {
  const {blog, handleLikeChange, handleDelete} = props
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
          toggleVisibility
        }
      })
  
    const showStyle = { display: visible ? '' : 'none' }
    console.log("blog detail: ", blog)
  
    return (
      <>
          <div style={showStyle} className={blogStyle} >
                  <p>
                    {blog.title}
                  </p>
                  <p>
                    <a href={blog.url}>{blog.url}</a>
                  </p>
                  <p>
                      {blog.likes} likes <Button onClick={handleLikeChange} text = "like"/>
                    </p>
                  <p>
                    added by <span>{blog.user.name}</span>
                  </p>
                  <Button onClick={handleDelete} text = "remove"/>
          </div>
      </>
    )
  })
  
  export default BlogDetail