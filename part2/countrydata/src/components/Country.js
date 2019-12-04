import React from 'react';

const Country = ({ countryNames }) => {
    console.log('list of country: ',countryNames)
  return (
    <ul>
      {countryNames}
    </ul>
  )
}

export default Country;
 