
import React from 'react';
import PropTypes from "prop-types"

const LoginForm = (props) => {
  const { handleLogin, 
              username, 
              handleUsernameChange,
              password,
              handlePasswordChange}= props

  return ( 
    <>
        <h2>Log in to application</h2> 
        <form onSubmit={handleLogin}>
                <div className ="form-group-control">
                    username: 
                        <input
                          type="text"
                          value={username}
                          name="username"
                          onChange={handleUsernameChange}
                        />
                </div>
                <div className ="form-group-control">
                    password: 
                        <input
                          type="password"
                          value={password}
                          name="password"
                          onChange={handlePasswordChange}
                      />
                </div>
                <button type="submit" clsssName ="form-group-login">login</button>
        </form>
    </>
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
