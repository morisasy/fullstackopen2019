
import React from 'react';


const LoginForm = ({ handleLogin, username, HandleUsernameChange, handlePasswordChange, password}) => {
 

  return (  
        <form onSubmit={handleLogin}>
                <div>
                Username: 
                    <input
                      type="text"
                      value={username}
                      name="Username"
                      onChange={HandleUsernameChange}
                    />
                </div>
                <div>
                Password: 
                    <input
                      type="password"
                      value={password}
                      name="Password"
                      onChange={handlePasswordChange}
                   />
                </div>
                <button type="submit">login</button>
        </form>
  )
}

export default LoginForm

