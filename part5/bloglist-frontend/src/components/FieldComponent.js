
import React from 'react';


const FieldComponent = (props) => {
 

  return (  
        <label className ="form-control">
                {props.name}: 
                    <input

                        type={props.type}
                        value={props.username}
                        name={props.name}
                        id = {props.name}
                        onChange={props.handleChange}
                    />
        </label>
  )
}

export default FieldComponent