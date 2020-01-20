import React, { useState, useEffect } from "react"
import './App.css';
import AddBlogForm from './components/AddBlogForm';
import Button from './components/Button';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import ErrorNotification from './components/ErrorNotification';
import SuccessNotification from './components/SuccessNotification';
import blogService from './services/blogs';
import loginService from './services/login';
import DisplayBlog from "./components/DisplayBlog";


function App() {

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] =  useState('')
  const [title, setTitle] =  useState('')
  const [author, setAuthor] =  useState('')
  const [url, setUrl] =  useState('')
  // create AddblogForm reference
  const addBlogFormRef = React.createRef()

  // get all blog data from server
  // Initilize blogs state
  useEffect(() => {
    blogService
      .getAll().then(initialBlog => {
       // let sortedBlog = sortByLikes(initialBlog)
        setBlogs(initialBlog)
       // setBlogs(sortedBlog)
      })
  }, [])
  console.log("initial blogs", blogs)
// get user information from localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

// handle login
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log("user services", user)

      window.localStorage.setItem(
        'loggedBlogListappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch (exception) {
      setErrorMessage(` Wrong username or password`)
    
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  
    }
   
  }

// handle UsernameChange
const handleUsernameChange = (event) => {
  console.log("Handle Name Change",event.target.value);
   setUsername(event.target.value) 
};

// HandlePassWordChange
const handlePasswordChange = (event) => {
  console.log("Handle password Change",event.target.value);
  setPassword(event.target.value);
};

// HandleTitleWordChange
const handleTitleChange = (event) => {
  console.log("Handle Title Change",event.target.value);
  setTitle(event.target.value);
};

// HandlePassAuthorChange
const handleAuthorChange = (event) => {
  console.log("Handle Author Change",event.target.value);
  setAuthor(event.target.value);
};

// HandleUrlChange
const handleUrlChange = (event) => {
  console.log("Handle url Change",event.target.value);
  setUrl(event.target.value);
};





// create new blog
const handleAddBlog = async (event) => {
    event.preventDefault()
    console.log( "create blog")

    addBlogFormRef.current.toggleVisibility()

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      }
      console.log("new object to add: ", JSON.stringify(newBlog))
      const blogCreated = await blogService.create(newBlog)
      //setBlogs(blogs.concat(blogCreated))
      console.log("new object to add: ", JSON.stringify(blogCreated))
      setBlogs([...blogs, blogCreated])
      setSuccessMessage(`a new blog added: ${title} by ${user.name}`)
      
      setTitle('')
      setAuthor('')
      setUrl('')
      // Notification displays only 5s
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(`Something went wrong  ${error}`)
    
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  
    }
  }
// handle logout 
//logout functionality
const handleLogout = (event) => {
 
  try {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
    //window.localStorage.removeItem('login');
   setSuccessMessage('Successfully logged out');
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  } catch (error) {
    setErrorMessage(`Something went wrong  ${error}`)
    
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}
const handleLikeUpdate = blogId =>  async event => {
  event.preventDefault();
  try {

    //use find method to get a current clicked blog
    //
    let foundBlog =  await blogs.find(blog => blog.id === blogId) 
    console.log( "found blog", foundBlog)
    const newLike = foundBlog.likes + 1
    let blogToUpdate = { ...foundBlog,
                        likes: newLike,
                        user: user.id
                      }
    console.log( "updated blog", blogToUpdate)
    const blogUpdated = await  blogService.update(blogId, blogToUpdate)
    console.log( "updated blog", blogUpdated)
    setBlogs(blogs.map(blog => blog.id !== blogId ? blog: blogUpdated))
    setSuccessMessage(
       `Blog ${foundBlog.title} written by ${foundBlog.author} liked!`
       );
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  } catch (error) {
    setErrorMessage(`Something went wrong  ${error}`)
    
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    
    
  }
}

const handleDelete = blogId =>  async event => {
  event.preventDefault();
   //use find method to get a current clicked blog
  let blogToDelete =  await blogs.find(blog => blog.id === blogId) 
  console.log( "found blog:", blogToDelete )
  console.log( "found blog id: ", blogToDelete.id )
  console.log( "found blog blogId: ", blogId)


  // Get a new blog list
  // exclude a blog to be deleted
  const newBlogList =  await blogs.filter(blog => blog.id !== blogId)
  console.log( "new blog list: ", newBlogList)

  let okCancel = window.confirm(
    `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
    )
  if (okCancel) {
    try {
 
      const deletedBlog = await  blogService.remove(blogId)
      console.log( "updated blog", deletedBlog)
      setBlogs(newBlogList)
      setSuccessMessage(
         `Blog post ${blogToDelete.title} deleted`
         )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(`Something went wrong  ${error}`)
      
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      
      
    }
  }
}
  


  return (
    <div>
    
        {user === null ?
              <div>
              <h2>Log in to application</h2>
              <ErrorNotification message={errorMessage}/>
              <LoginForm
                  handleLogin={handleLogin}
                  username={username}
                  handleUsernameChange={handleUsernameChange}
                  password={password}
                  handlePasswordChange={handlePasswordChange}
              />
            </div> :
                      <div>
                        <h2>Blogs</h2>
                        
                        <SuccessNotification message={successMessage}/>
                        <p>{user.name} logged in
                          <Button onClick={handleLogout} text = "Logout"/>
                        </p>
                        <Togglable buttonLabel="create" ref ={addBlogFormRef} >
                            <AddBlogForm 
                              handleAddBlog={handleAddBlog}
                              title={title}
                              handleTitleChange={handleTitleChange}
                              author={author}
                              handleAuthorChange={handleAuthorChange}
                              url={url}
                              handleUrlChange={handleUrlChange}               
                            />
                        </Togglable>
                       
                        <div>
                         <DisplayBlog
                              blogs = {blogs}
                              handleLike = {handleLikeUpdate}
                              handleDelete = {handleDelete}
                         />
                        </div>
                      </div>
                }
               
        <Footer />
   </div>
  );
}

export default App;
