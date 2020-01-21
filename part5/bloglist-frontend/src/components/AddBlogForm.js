import React from 'react';
import PropTypes from "prop-types"


const AddBlogFrom = (props) =>{
  const { handleAddBlog,
          title, 
          handleTitleChange,
          author,
          handleAuthorChange,
          url,
          handleUrlChange} = props

   return(
        <div className = "form-group">
             <form onSubmit={handleAddBlog}>
                      <div className = "form-group-control">
                        Title: <input 
                                    value={title} 
                                    onChange={handleTitleChange}
                                    type="text" 
                                    required
                                    />
                        </div>
                        <div className = "form-group-control">
                        Author: <input 
                                    value={author} 
                                    onChange={handleAuthorChange}
                                    type="text" 
                                    required
                                    />
                        </div>
                        <div className = "form-group-control">
                        url: <input 
                                    value={url} 
                                    onChange={handleUrlChange}
                                    type="text" 
                                    required
                                    />
                        </div>
                        <div className = "form-group-control">
                        <button type="submit">Create</button>
                        </div>
            </form>
        </div>
    )
}

AddBlogFrom.propTypes = {
    handleAddBlog: PropTypes.func,
    title: PropTypes.string,
    handleTitleChange: PropTypes.func,
    author: PropTypes.string,
    handleAuthorChangee: PropTypes.func,
    handleUrlChange: PropTypes.func,
    url: PropTypes.string
  }

export default AddBlogFrom;