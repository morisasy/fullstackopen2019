import React from 'react';

const WeatherInfo= ({listItems}) => {
    if (!listItems) {
        return null;
      }
      if (!listItems.length) {
        return <p>Sorry, the list is empty.</p>;
      } else {
        return (
          <ul>
            {listItems.map(item=> <li  key={item.name}>{item.name}</li>)}
          </ul>
        );
      }
    
  }


  export default WeatherInfo;
