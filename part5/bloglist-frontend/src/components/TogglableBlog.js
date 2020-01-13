import React, { useState, useImperativeHandle } from 'react'


const TogglableBlog = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
  // title: "Globaali Trendi usa vs iran ", author: "Matti Luukkainen", url: "www.maailman.fi/iranusa", likes: 0
    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
          toggleVisibility
        }
      })
  
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  })
  
  export default TogglableBlog