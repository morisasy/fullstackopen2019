import React from 'react';
import PropTypes from "prop-types"


const AddBlogFrom = (props) =>{
  const { handleAddBlog,
          title, 
          handleTitleChange,
          author,
          handleAuthorChange,
          url,
          handleUrlChange} = props;
  // const [blogFormVisible, setBlogFormVisible] = useState(false)
   return(
        <div>
             <form onSubmit={handleAddBlog}>
                <div>
                        Title: <input 
                                    value={title} 
                                    onChange={handleTitleChange}
                                    type="text" 
                                    required
                                    />
                        </div>
                        <div>
                        Author: <input 
                                    value={author} 
                                    onChange={handleAuthorChange}
                                    type="text" 
                                    required
                                    />
                        </div>
                        <div>
                        url: <input 
                                    value={url} 
                                    onChange={handleUrlChange}
                                    type="text" 
                                    required
                                    />
                        </div>
                        <div>
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