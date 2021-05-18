import './App.css';
import { Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import TextBox from './Components/TextBox/TextBox.jsx';
import Nav from './Components/Nav/Nav.jsx';
import WeatherCards from './Components/WeatherCards/WeatherCards.jsx';

import axios from 'axios';

function App() {

  const [ values, setValues ] = useState({});
  const [ latitude, setLatitude ] = useState([]);
  const [ longitude, setLongitude ] = useState([]);
  const [ weatherData, setWeatherData ] = useState({});

  //use effect - gets the latitude and longitude from the user's location, then automatically pulls up the weather data with async await funcitons
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setWeatherData(result)
        console.log(result);
      });
    }
    
    fetchData();
  }, [latitude,longitude])

  //handle change
  const handleChange = (event) => {

    event.persist();

    setValues(values => ({...values, [event.target.name]: event.target.value}));

    console.log(values);
  }

  //handle submit
  const handleSubmit = (event) => {

  }

  return (
    <React.Fragment>
      <Nav />
      
      <Row>
        <Col xs={4}/>
        <Col xs={4}>
          <TextBox handleChange={handleChange} handleSumbit={handleSubmit}/>
        </Col>
        <Col xs={4}/>
      </Row>
      
      {(weatherData.main != undefined) ? 
      <Row>
        <Col xs={2}/>
        <Col xs={8}>
          <WeatherCards data={weatherData} />
        </Col>
        <Col xs={2} />
      </Row> : <div>loading...</div>}


    </React.Fragment>
  );
}

export default App;
