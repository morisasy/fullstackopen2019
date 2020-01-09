import React from 'react';



const AddBlogFrom = (props) =>{
    const {onSubmitAddBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange} =props;
    return(
        <div>
             <form onSubmit={onSubmitAddBlog}>
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