
import React from 'react';


const LoginComponent = ({ handleLogin, username, HandleUsernameChange, handlePasswordChange, password}) => {
 

  return (  
        <form onSubmit={handleLogin}>
                <label className ="form-group">
                Username: 
                    <input
                      type="text"
                      value={username}
                      name="Username"
                      onChange={HandleUsernameChange}
                    />
                </label>
                <label className ="form-group">
                Password: 
                    <input
                      type="password"
                      value={password}
                      name="Password"
                      onChange={handlePasswordChange}
                   />
                </label>
                <button type="submit">login</button>
        </form>
  )
}

export default LoginComponent

