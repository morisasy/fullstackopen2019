import React, { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = "http://api.weatherstack.com/current?"
const appkey = "access_key=3207c2baad36e6600edc52976132de8b&query=";

const CountryWeather = ({capital}) => {
     const [weatherData, setWeatherData] = useState({})

     useEffect(()=>{
       console.log('effect Country Weather Component', capital);
       axios
           .get(baseUrl + appkey + capital, {crossDomain: true})
           .then(response => {
             console.log('promise fulfilled Weather', response.data)
             setWeatherData(response.data.current) 
           }).catch(error => {
            console.log('fail')
          });
     },[]);
    
   console.log('render', weatherData, ' weather data ')
    
  if( weatherData !== undefined && weatherData != null && Object.keys(weatherData) !==0){
     
  return (
    <div>
      <h3> Weather in {capital}</h3>
      <p><b>Temperature:</b> {weatherData.temperature} &#176; Celsius</p>
      <img src={weatherData.weather_icons} alt="weather" height='50px' width='50px' />   
      <p><b>Wind spead:</b> {weatherData.wind_speed} kph <b>direction</b> {weatherData.wind_dir}</p>   
  </div>
  )  
  } else{
    return null;
  }
  
}

export default CountryWeather;