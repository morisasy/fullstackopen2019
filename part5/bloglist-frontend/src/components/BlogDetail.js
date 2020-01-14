import React, { useState, useImperativeHandle } from 'react'

import Button from './Button'
const BlogDetail = React.forwardRef((props, ref) => {
  const {blog} = props
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
    const [visible, setVisible] = useState(false)

  /* title: "Globaali Trendi usa vs iran ", 
  author: "Matti Luukkainen", url:
   "www.maailman.fi/iranusa",
    likes: 0
    */
    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
          toggleVisibility
        }
      })

  
    const showStyle = { display: visible ? '' : 'none' }
  
    return (
      <div>
          <div style={showStyle} className={blogStyle} >
                  <p>
                    {blog.title}
                  </p>
                  <p>
                    <a href={blog.url}>{blog.url}</a>
                  </p>
                  <p>
                      {blog.likes} likes <button>like</button>
                    </p>
                  <p>
                    added by <span>{blog.author}</span>
                  </p>
          </div>
      </div>
    )
  })
  
  export default BlogDetail