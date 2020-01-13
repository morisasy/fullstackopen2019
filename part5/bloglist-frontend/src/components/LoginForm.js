
import React from 'react';
import PropTypes from "prop-types"

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
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string,
  handleUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string,
  handlePasswordChange: PropTypes.func.isRequired
}
export default LoginForm

