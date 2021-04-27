import React from 'react';
import Axios from 'axios';
import DisplayWeather from './components/DisplayWeather'
import Navbar from './components/Navbar'
import './App.css';

class App extends React.Component {

  state={
    coords:{
      latitude:45,
      longitude:60
    },
    data: {},
    inputData:""
  }

  componentDidMount(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((postion)=>{
        let newCoords = {
          latitude:postion.coords.latitude,
          longitude:postion.coords.longitude
        }
        this.setState({coords:newCoords});
        //API CALL
        Axios.get(`http://api.weatherstack.com/current?access_key=081aec728b3ed927753c3102419894ad&query=${this.state.coords.latitude},${this.state.coords.longitude}`).then(res =>{
        
          let weatherData = {
            location:res.data.location.name,
            temperature:res.data.current.temperature,
            description:res.data.current.weather_descriptions,
            region:res.data.location.region,
            country:res.data.location.country,
            wind_speed:res.data.current.wind_speed,
            pressure:res.data.current.pressure,
            precip:res.data.current.precip,
            humidity:res.data.current.humidity,
            img:res.data.current.weather_icons
          }

            this.setState({data:weatherData});

        });
      })
    }
    else{
      console.log("did'nt get the location");
    }
  }

  //track input data
change=(value)=>{
  this.setState({inputData:value})
}

changeWeather=(events)=>{
  events.preventDefault();

  Axios.get(`http://api.weatherstack.com/current?access_key=081aec728b3ed927753c3102419894ad&query=${this.state.inputData}`).then(res=>{
    let weatherData = {
      location:res.data.location.name,
      temperature:res.data.current.temperature,
      description:res.data.current.weather_descriptions,
      region:res.data.location.region,
      country:res.data.location.country,
      wind_speed:res.data.current.wind_speed,
      pressure:res.data.current.pressure,
      precip:res.data.current.precip,
      humidity:res.data.current.humidity,
      img:res.data.current.weather_icons
    }

      this.setState({data:weatherData});

  });
}




  render(){
  return (
    <div className="App">
      <div className="container">
        <Navbar changeWeather={this.changeWeather} changeRegion={this.change}/>
      <DisplayWeather weatherData={this.state.data}/>
      </div>
    </div>
  );
}
}

export default App;