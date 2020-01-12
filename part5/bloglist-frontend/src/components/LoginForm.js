
import React from 'react';


const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange}) => {
 // const { handleLogin, username, handleUsernameChange, password, handlePasswordChange} = props
 

  return (  
        <form onSubmit={handleLogin}>
                <div className ="form-group">
                    username: 
                        <input
                          type="text"
                          value={username}
                          name="username"
                          onChange={handleUsernameChange}
                        />
                </div>
                <div className ="form-group">
                    password: 
                        <input
                          type="password"
                          value={password}
                          name="password"
                          onChange={handlePasswordChange}
                      />
                </div>
                <button type="submit">login</button>
        </form>
  )
}

export default LoginForm

