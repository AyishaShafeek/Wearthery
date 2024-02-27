import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud ,faMagnifyingGlass,faSun} from '@fortawesome/free-solid-svg-icons';

function App() {
const [city,setcity] = useState();
const [Weather,setWeather] = useState(null);
const apikey="3c7262986f4040a67871a581a1c49922"
const url="https://api.openweathermap.org/data/2.5/weather";


const    fetchdata = async() => {
    try {
      const response = await axios.get(`${url}?q=${city}&appid=${apikey}&units=metric`);
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchdata();
  };

  return (
    <div className="container-fluid bgpad">
      <div className='container'>
         <div className='row'>
          <div className='col-lg-12 py-5'>
            <h3 className='text-center fw-bold text-white'><span className=''><FontAwesomeIcon icon={faCloud} className='bgcloud' /> </span><span className='marg'>WeatherY</span></h3>
            <p className='text-center fonlive pt-3 fw-bold'><span className='bordlive px-4 py-1'>LIVE WEATHER</span></p>
          </div>
          <div className='col-lg-7 mx-auto'>
          <form onSubmit={handleSubmit}>
          <div className="input-group mb-1 box">
                     <input type="text" class="form-control bginput ps-4 text-white py-2" value={city} placeholder="Enter Your City" aria-label="city" onChange={(e)=>{
                      setcity(e.target.value);
                     }}/>
                     <div className="input-group-append">
                     <button className="btn bgbtn pe-4 " type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                     </div>
                     </div>
            </form>         
                     
          </div>
         
            {Weather &&(
              <>
              <div className='col-lg-6 mx-auto mt-3 border1 py-3'>
              
               <h5 className='text-center text-white' >{Weather.name} | {Weather.sys.country}</h5>
               <p className='text-center text-white '><span><img src={`https://openweathermap.org/img/wn/${Weather.weather[0].icon}.png`} alt="" className='sun'/></span></p>
               
               <h1 className='text-center text-white py-3 fw-bold'>{Weather.main.temp}<span>&#176;</span>C</h1>
            
               <p className='text-center text-white tex-uppercase fw-bold'>{Weather.weather[0].description}</p>
               <p className='text-center text-white py-1'>Min-temp:{Weather.main.temp_min}&deg; || Max-temp: {Weather.main.temp_max}&deg; || Humadity:{Weather.main.humidity}%</p>
               <p className='text-center text-white paraknow'>timezone:{Weather.timezone}&deg; || lat: {Weather.coord.lat}&deg; || lon:{Weather.coord.lon}</p>
               
               </div>
         </>
            )}
          
         </div>
      </div>
    </div>
  );
}

export default App;
