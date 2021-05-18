import './App.css';
import { Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import TextBox from './Components/TextBox/TextBox.jsx';
import Nav from './Components/Nav/Nav.jsx';
import CurrentWeatherCard from './Components/CurrentWeatherCard/CurrentWeatherCard.jsx';
import WeatherForcastCards from './Components/WeatherForcastCards/WeatherForcastCards.jsx';

function App() {

  const [ values, setValues ] = useState({});
  const [ latitude, setLatitude ] = useState([]);
  const [ longitude, setLongitude ] = useState([]);
  const [ weatherData, setWeatherData ] = useState({});
  const [ weatherForecast, setWeatherForecast ] = useState({});

  //use effect - gets the latitude and longitude from the user's location, then automatically pulls up the weather data with async await funcitons
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${latitude}&lon=${longitude}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setWeatherData(result)
        console.log(result);
      })
      .catch(err => {console.log(err)});
      
      await fetch(`${process.env.REACT_APP_API_URL}/forecast/?lat=${latitude}&lon=${longitude}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setWeatherForecast(result)
      })
      .catch(err => {console.log(err)});
      
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
    
    event.preventDefault();

    const getCityData = async () => {

      const url = `${process.env.REACT_APP_API_URL}/weather?q=${values.userInput}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
      const urlForecast= `${process.env.REACT_APP_API_URL}/forecast?q=${values.userInput}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`

      await fetch(url)
      .then(res => res.json())
      .then(result => {
        setWeatherData(result)
        console.log(result);
      })
      .catch(err => {console.log(err)});

      await fetch(urlForecast)
      .then(res => res.json())
      .then(result => {
        setWeatherForecast(result)
        console.log(result);
      })
      .catch(err => {console.log(err)});

    }

    getCityData();
    
  }

  return (
    <React.Fragment>
      <Nav />
      
      <Row>
        <Col xs={4}/>
        <Col xs={4}>
          <TextBox handleChange={handleChange} handleSubmit={handleSubmit} />
        </Col>
        <Col xs={4}/>
      </Row>
      
      {(typeof weatherData.main != 'undefined') ? 
      <React.Fragment>
        <Row>
          <Col xs={5}/>
          <Col>
            <h5>
              Current Weather
            </h5>
          </Col>
          <Col xs={5}/>
        </Row>
        <Row>
          <Col xs={2}/>
          <Col xs={8}>
            <CurrentWeatherCard data={weatherData} />
          </Col>
          <Col xs={2} />
        </Row> 
        
        <Row>
          <Col xs={5}/>
          <Col>
            <h5>
              5 Day Forecast:
            </h5>
          </Col>
          <Col xs={5}/>
        </Row>
        <Row>
          <Col xs={2}/>
          <Col xs={8}>
            <WeatherForcastCards data={weatherForecast} />
          </Col>
          <Col xs={2} />
        </Row>
      </React.Fragment>

      : <div>loading...</div>}
    </React.Fragment>
  );
}

export default App;
