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
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialBlog => {
        setBlogs(initialBlog)
        console.table(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
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
   console.log(" Name Change",username);
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
      setSuccessMessage(`${user.username} logged in`)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(`Welcome back ${user.username}!`)
      /*
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      */
    }
  }


const handleAddBlog = async (event) => {
    event.preventDefault()
    console.log( "create blog")
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
                        <p>{user.name} logged in</p>
                        <SuccessNotification message={successMessage}/>
                        <p>{user.name} logged in
                          <Button onClick={handleLogout} text = "Logout"/>
                        </p>
                        <AddBlogForm 
                          onSubmitAddBlog={handleAddBlog}
                          title={title}
                          handleTitleChange={handleTitleChange}
                          author={author}
                          handleAuthorChange={handleAuthorChange}
                          url={url}
                          handleUrlChange={handleUrlChange}               
                        />
                        {blogs.map(blog =>
                          <Blog key={blog.id} blog={blog} />
                        )}
                      </div>
                }
               
                <div>
                    <ul>
                    
                    </ul> 
                </div>
               
        <Footer />
   </div>
  );
}

export default App;
