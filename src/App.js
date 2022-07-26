import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('Pretoria')

  

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ea21ac3919f88c71266d2d4a95c48e48`;

  axios.get(url).then((response)=>{
    setData(response.data)
   })

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
       axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
       })
       setLocation('')
    }
  }
  const dateBuilder = (d)=>{
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear()
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="App">
     <center> <div className='wrapper'>
        <div className='mainwrapper'>
        <input onChange={event =>setLocation(event.target.value)}
          onKeyPress={searchLocation} 
          value={location}
          placeholder='Enter location'
          type='text'
        /> 
        <div className='city'>
          <h2>{data.name} {/* {data.sys.country} */}</h2>
          <p className='date'>{dateBuilder(new Date())}</p>
          <div className='line'></div>
        </div>
          <div className='sec'>
              <div className='temp'>
                  {data.main ? <h1 style={{fontSize:"55px"}}>{data.main.temp.toFixed()}<sup>o</sup>C</h1> : null}
              </div>
              <div className='secdiv'>
                 <div className='weather'>
                    {data.weather ? <h1>{data.weather[0].description}</h1> : null}
                 </div>
                 <div className='feels'>
                    {data.main ? <h2><span>Feels Like:</span> {data.main.feels_like.toFixed()}<sup>o</sup>C</h2> : null}
                 </div>
                 <div className='humidity'>
                    {data.main ? <h2><span>Humidity: </span>{data.main.humidity.toFixed()}%</h2> : null}
                </div>
                <div className='wind'>
                   {data.wind ? <h2><span>Wind speed:  </span> {data.wind.speed} MPH</h2> : null}
                </div>
             </div>
          </div>
        </div>
        
      </div></center>
    </div>
  );
}
export default App;