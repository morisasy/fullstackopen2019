import React, { useState, useEffect } from "react"
//import logo from './logo.svg';
import './App.css';
import AddBlogForm from './components/AddBlogForm';
import Blog from './components/Blog';
import Button from './components/Button';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import ErrorNotification from './components/ErrorNotification';
import SuccessNotification from './components/SuccessNotification';
import blogService from './services/blogs';
import loginService from './services/login';



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

  // get all blog data from server
  // Initilize blogs state
  useEffect(() => {
    blogService
      .getAll().then(initialBlog => {
        setBlogs(initialBlog)
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




const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

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

// create new blog
const handleAddBlog = async (event) => {
    event.preventDefault()
    console.log( "create blog")

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      console.log("new object to add: ", JSON.stringify(newBlog))
      const blogCreated = await blogService.create(newBlog)
      //setBlogs(blogs.concat(blogCreated))
      setBlogs([...blogs, blogCreated])
      setSuccessMessage(`a new blog added: ${title} by ${author}`)
      
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
const handleLogout = async (event) => {
  window.localStorage.clear()
  blogService.setToken(null)
  setUser(null)
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
                        <AddBlogForm 
                          handleAddBlog={handleAddBlog}
                          title={title}
                          handleTitleChange={handleTitleChange}
                          author={author}
                          handleAuthorChange={handleAuthorChange}
                          url={url}
                          handleUrlChange={handleUrlChange}               
                        />
                        <div>
                          {blogs.map(blog =>
                            <Blog key={blog.id} blog={blog} />
                          )}
                        </div>
                      </div>
                }
               
        <Footer />
   </div>
  );
}

export default App;
