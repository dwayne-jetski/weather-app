import './App.css';
/* import statements for all of the necessary files/components */
import { Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import TextBox from './Components/TextBox/TextBox.jsx';
import Nav from './Components/Nav/Nav.jsx';
import CurrentWeatherCard from './Components/CurrentWeatherCard/CurrentWeatherCard.jsx';
import WeatherForecastCards from './Components/WeatherForecastCards/WeatherForecastCards.jsx';

function App() {

  /* below are hooks to store the necessary data gathered from the user interactions */
  const [ values, setValues ] = useState({});
  const [ latitude, setLatitude ] = useState([]);
  const [ longitude, setLongitude ] = useState([]);
  const [ weatherData, setWeatherData ] = useState({});
  const [ weatherForecast, setWeatherForecast ] = useState({});

  /* use effect - gets the latitude and longitude from the user's location, then automatically pulls up the weather data with async/await funcitons
  the useEffect function will re-render the page when latitude or longitude are updated, causing the fetches to happen again and ----
  gather the appropriate info to display to the user */
  useEffect(() => {
    /* the fetchData function houses all of the statements to be ran when the useEffect triggers */
    const fetchData = async () => {

      /* this statement grabs the user's location data, then sets Longitude and Latitude to the user's lon and lat respectively */
      navigator.geolocation.getCurrentPosition(function(position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });

      /* this is a fetch request to the url to get the current weather in based on the longitude and latitude
      all of the parts for the URL are kept in a .env file to ensure the key and the beginning of the URL are kept out of the repo */
      const urlCurrentWeather = `${process.env.REACT_APP_API_URL}/weather/?lat=${latitude}&lon=${longitude}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
      /* fetch request will grab the data, and setWeatherData to the data gotten from the response,otherwise it will console.log(err) */
      await fetch(urlCurrentWeather)
      .then(res => res.json())
      .then(result => {
        setWeatherData(result)
        
      })
      .catch(err => {console.log(err)});
      
      /* similar to the previous fetch request, this does the same thing but for the weather forecast */
      const urlWeatherForecast = `${process.env.REACT_APP_API_URL}/forecast/?lat=${latitude}&lon=${longitude}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
      await fetch(urlWeatherForecast)
      .then(res => res.json())
      .then(result => {
        setWeatherForecast(result)
      })
      .catch(err => {console.log(err)});
      
    }

    /* calls the fetch data function defined above */
    fetchData();
  }, [latitude,longitude])

  /* handleChange will take the values of the user input and store them locally, so when the user starts to type something, each keystroke is logged into 
  values as a specific property, in this case it goes to the TextBox component and is saved as values.userInput*/
  const handleChange = (event) => {

    event.persist();

    setValues(values => ({...values, [event.target.name]: event.target.value}));
  }

  /* handleSubmit will take the given value and use it to submit to the correct city, 
  it goes through similar async await functions as the initial search, but it is based on the user input rather than the lat and long */
  const handleSubmit = (event) => {
    
    /* prevents page refresh upon being clicked */
    event.preventDefault();

    /* a function that triggers when the user clicks the submit button */
    const getCityData = async () => {

      /* a const that houses the url for the current weather based on the city from the user input */
      const urlCurrentWeatherCity = `${process.env.REACT_APP_API_URL}/weather?q=${values.userInput}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`;
      /* the fetch request based off of the city from the user input, gathers the current weather from the city and sets weatherData to the result otherwise console.log(err) */
      await fetch(urlCurrentWeatherCity)
      .then(res => res.json())
      .then(result => {
        setWeatherData(result)
      })
      .catch(err => {console.log(err)});
      

      /* a const that houses the url for the weather forecast based on the city from the user input */
      const urlWeatherForecastCity = `${process.env.REACT_APP_API_URL}/forecast?q=${values.userInput}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`;
      /* the fetch request based off the city from the user input, gathers the weather forecast and sets weatherForecast to the result otherwise console.log(err) */
      await fetch(urlWeatherForecastCity)
      .then(res => res.json())
      .then(result => {
        setWeatherForecast(result)
        
      })
      .catch(err => {console.log(err)});

    }

    /* calls the getCityData function */
    getCityData();
    
  }

  /* the return statement from App.js that houses all of the code that will display to the user */
  return (
    /* everything is housed inside of a React.Fragment */
    <React.Fragment>

      {/* at the top of the React.Fragment are the Nav and TextBox components textbox is housed inside a row with col elements before and after to keep it centered */}
      <Nav />
      
      {/* textbox is housed inside a row with col elements before and after to keep it centered */}
      <Row>
        <Col xs={4}/>
        <Col xs={4}>
          <TextBox handleChange={handleChange} handleSubmit={handleSubmit} />
        </Col>
        <Col xs={4}/>
      </Row>
      
      {/* below is a ternary operator to ensure that the weather cards aren't displayed unless weatherData != 'undefined', 
      if weatherData == 'undefined' it will simply display <div>loading...<div>
      otherwise it displays the weather cards*/}
      {(typeof weatherData.main != 'undefined') ? 
      <React.Fragment>
        {/* row and columns to center the Current Weather header */}
        <Row>
          <Col xs={5}/>
          <Col>
            <h5>
              Current Weather
            </h5>
          </Col>
          <Col xs={5}/>
        </Row>
        {/* row and columns to center the CurrentWeatherCard */}
        <Row>
          <Col xs={2}/>
          <Col xs={8}>
            <CurrentWeatherCard data={weatherData} />
          </Col>
          <Col xs={2} />
        </Row> 
        
        {/* row and columns to center the 5 day forecast header */}
        <Row>
          <Col xs={5}/>
          <Col>
            <h5>
              5 Day Forecast:
            </h5>
          </Col>
          <Col xs={5}/>
        </Row>

        {/* row and columns to center the WeatherForecastCards */}
        <Row>
          <Col xs={2}/>
          <Col xs={8}>
            <WeatherForecastCards data={weatherForecast} />
          </Col>
          <Col xs={2} />
        </Row>
      </React.Fragment>

      : <div>loading...</div>}

    </React.Fragment>
  );
}

export default App;
