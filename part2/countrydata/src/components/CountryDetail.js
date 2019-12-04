import React from 'react';
import CountryWeather from  './CountryWeather';


const CountryDetail = ({country}) => {
    console.log('Country Deteil Component: ', country);
    console.log('Country Name: ', country.name);
    if( country !== undefined && country != null && Object.keys(country) !==0){   
        return (
            <div key={country.name}>
                <h2>{country.name}</h2>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <h3> Languages</h3>
                <ul>
                  {country.languages.map(language=><li  key={language.name}>{language.name}</li>)}
                </ul>
                <img src={country.flag} alt="flag" height='133px' />    
                <CountryWeather  capital= {country.capital}  />    
            </div>
          )
    }else{
      return null;
    }
}

export default CountryDetail;