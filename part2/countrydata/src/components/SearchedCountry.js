import React from 'react';
import Button from './Button';

const SearchedCountry = ({ filterCountry, handleCountryClick}) => {
    console.log('list of country: ',filterCountry)
  
   const searchedCountries = filterCountry.map(country=>{
 
                return (<span>
                            <p>       
                            {country.name}  <Button 
                                                onClick={event=>handleCountryClick(country.name,event)} 
                                                text ="show" /> 
                            </p> 
                    </span>)
     })
    return  searchedCountries;

}

export default SearchedCountry;