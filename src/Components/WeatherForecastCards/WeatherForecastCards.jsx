import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

/* This functional component is responsible for generating the cards for the Weather Forecast 5 days out */

function WeatherForecastCards(weatherForecast) {

    /* the function below is to create the weather forecast cards */

    const CreateWeatherForecastCards = () => {

        /* the statement below takes the data gathered and gets only 1 weather forecast for each day, rather than 1 for every 3 hours 
        I decided that the user wouldn't need to see 8 weather estimates for each day, and that one for each day would be enough*/
        const forecastData = weatherForecast.data.list.filter((e, i) => i % 8 === 8 - 3);

        /* the return statement below uses the .map method to create the cards from the forecastData array */
        return forecastData.map((data) => {
            /* below the relevant data is destructured out of the data from forecastData  */
            const { main, dt, weather } = data;
            /* below is a statement to create a legible date for the user out of the data provided */
            let time = new Date(dt * 1000);
            time = time.toUTCString();

            /* below is the return statement that creates a card for each element in forecastData.
            It only shows the date the forecast is for, the predicted High, Low and the description of the weather for that day.
            Each card is contained within a Bootstrap Column to keep the app mobile responsive*/
            return(
                <Col>
                    <Card bg="secondary" text="light" className="card_style" >
                        <Card.Body>
                            <Card.Text>{time}</Card.Text>
                            <Card.Text>High:{main.temp_max} </Card.Text>
                            <Card.Text>Low: {main.temp_min}</Card.Text>
                            <Card.Text>Description: {weather[0].description}</Card.Text>
                            <Card.Text></Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            )
        })

    }

    return (
        <Row>
            {/* below is a ternary operator to ensure that the CreateWeatherForecastCards function is not run unless weatherForecast.data.list isn't empty
            it is housed in a row to ensure mobile responsiveness of the cards within */}
            {(weatherForecast.data.list != undefined) ? CreateWeatherForecastCards() : <div>loading...</div>}
        </Row>
    )
}

export default WeatherForecastCards
