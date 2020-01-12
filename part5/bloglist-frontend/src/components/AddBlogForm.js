import React from 'react';



const AddBlogFrom = ({ handleAddBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange}) =>{
   // const {onSubmitAddBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange} =props;
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

export default AddBlogFrom;