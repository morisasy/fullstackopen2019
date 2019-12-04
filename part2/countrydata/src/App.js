import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from  './components/Filter';
import CountryDetail from  './components/CountryDetail';
import Display from  './components/Display';
import SearchedCountry from './components/SearchedCountry';
const App = () => {
  const [ countries, setCountries] = useState([]);
  const [ filterCountry, setFilterCountry ] = useState('');
  const [showAll, setShowAll] = useState(false)
 
  useEffect(() => {
    console.log('effect');
    const fetchCountryData = ()=>{
        axios
          .get('https://restcountries.eu/rest/v2/all', {crossDomain: true})
          .then(response => {
            console.log('Promise fulfilled country data', response.data);
          setCountries(response.data)
          }).catch(error =>{
            console.log("Error fetchData :", error);
          });
    };
    fetchCountryData();
  },[])
  console.log('render', countries.length, 'countries')


  const handleFilterChange  = (event) => {
    console.log("Search Country", event.target.value);
    console.log("country filter", countries);
      
    const filteredCountry = countries.filter(country =>
      country.name.toLowerCase().includes(event.target.value.toLowerCase()));
      setFilterCountry(filteredCountry);
      
  }
 
  const handleCountryClick = (countryName, event) => {
    event.preventDefault()
    console.log("countryName", countryName);
    console.log("countries ", countries);
      
    const filteredCountry = countries.filter(country =>
       country.name.toLowerCase().includes(countryName.toLowerCase()));

    //filteredCountry
    console.log('Filtered Country',filteredCountry)
    setFilterCountry(filteredCountry)
    setShowAll(true)
  }
   const countCountry = filterCountry.length;
   console.log('filter length',countCountry)

  return (
    <div >
      <h1>Countries</h1>
          
      <Filter 
        filterCountry={filterCountry.name} 
        handleFilterChange={handleFilterChange} 
      />
      <h2>Countries</h2>
      {(countCountry>1 && countCountry< 11) &&  <SearchedCountry 
                                                  filterCountry ={filterCountry}
                                                  handleCountryClick ={handleCountryClick}
                                                   />
        
      }

      {(countCountry===1) && <CountryDetail 
                          country={filterCountry[0]}
                          />}
      {(countCountry ===0 && showAll) && <Display /> }
      
    </div>
  );
}
/*
filterCountry.map(country=><li  
                                key={country.name}
                                >{country.name} <Button 
                                     onClick={event=>handleCountryClick(country.name,event)} 
                                      text ="show" /> 
                                </li>)

*/

export default App;
