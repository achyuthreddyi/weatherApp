import React , { useEffect, useState } from 'react';
import Axios from 'axios'

import './App.css';
import Navbar from './components/Navbar';
import DisplayWeather from './components/DisplayWeather'
import Map from './components/Map'

import "leaflet/dist/leaflet.css"

function App() {
  const [latitude, setLatitude] = useState(13.395601)
  const [longitude, setLongitude] = useState(78.05029069999999)
  const [temperature, setTemperature ] = useState()
  const [description, setDescription ] = useState()
  const [location, setLocation ] = useState()
  const [region, setRegion ] = useState()
  const [country, setCountry ] = useState()
  const [wind_speed, setWind_speed ] = useState()
  const [pressure, setPressure ] = useState()
  const [precip, setPrecip ] = useState()
  const [humidity, setHumidity ] = useState()
  const [img, setImg ] = useState()
  const [inputData, setInputData] = useState()
  const [mapcenter, setMapcenter ] = useState( { lat:latitude, lng:longitude} )
  const [mapzoom, setMapZoom] = useState(3)
  

  const changeRegion =(value) =>{
    console.log(" insidet hsadas prop drilling ", value);
    setInputData(value)
  }

  const updateWeather = (event) =>{
    event.preventDefault()
    event.target.value = ''
    // api call 
    Axios.get(`http://api.weatherstack.com/current?access_key=1de42a4cb5c03be7b790a50c51b14318&query=${inputData}`)
    .then(res =>{
      // console.log("inside tej afaf", res.data.location.country);
      setTemperature( res.data.current.temperature )
      setDescription( res.data.current.weather_descriptions[0] )
      setLocation( res.data.location.name )
      setRegion( res.data.location.region)
      setCountry( res.data.location.country )
      setWind_speed( res.data.current.wind_speed )
      setPressure( res.data.current.pressure )
      setPrecip( res.data.current.precip )
      setHumidity( res.data.current.humidity )
      setImg( res.data.current.weather_icons )
      setMapcenter({lat: res.data.location.lat, lng:res.data.location.lon } )
      setMapZoom(15)      
    })
    .catch( _ =>{
      console.log("error loading the map data");
    })
    
  }

  const APIKEY= '9e73b68b8ef8600c4a70cd8db227fb96'
  
  useEffect(() => {     
    navigator.geolocation.getCurrentPosition((position)  => {
      console.log('position',position);
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)  
      setMapcenter({lat: position.coords.latitude, lng:position.coords.longitude })    
    })
    // api call  
    Axios.get(`http://api.weatherstack.com/current?access_key=1de42a4cb5c03be7b790a50c51b14318&query=${latitude},${longitude}`)
      .then( res =>{
        console.log('data',res);
        setTemperature( res.data.current.temperature )
        setDescription( res.data.current.weather_descriptions[0] )
        setLocation( res.data.location.name )
        setRegion( res.data.location.region)
        setCountry( res.data.location.country )
        setWind_speed( res.data.current.wind_speed )
        setPressure( res.data.current.pressure )
        setPrecip( res.data.current.precip )
        setHumidity( res.data.current.humidity )
        setImg( res.data.current.weather_icons )

      })
      .catch( _ =>{
        console.log("error loading the api ");
      })

  }, [])
 
 

  return (
    <div className="App">
      <Navbar 
      changeRegion = { changeRegion }
      updateWeather = { updateWeather }
      />
      <div className = "weather__app">

        <div className='app__left'>         
        <DisplayWeather 
              temperature =  {temperature}
              description = {description}
              location = { location}
              region = { region }
              country = { country}
              wind_speed = { wind_speed}
              pressure = { pressure }
              precip = { precip}
              humidity = { humidity }
              img = { img }    
        />          


        </div>

        <div className='app__right'> 
          <Map 
          center= { mapcenter }
          // zoom = { mapzoom }
          />      

        </div >

      </div>
     
    </div>
  );
}

export default App;
