import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';


/* This react functional component is responsible for creating the weather card for the current weather */

function CurrentWeatherCards(weatherData) {

    /* This function is called within the render function */
    const createCurrentWeatherCard = () => {

        /* Here is where the necessary data is destructured from the passed in weather data */
        const { name, main, weather, sys } = weatherData.data;

        /* below is where I get the current time to be displayed on the card */
        let newDate = new Date();
        const time = newDate.toLocaleString();


        /* This return statement returns a bootstrap card that organizes the destructured data */
        return(
            <div>
                <Card bg="dark" text="light" className="card_style" style = {{ width: '20rem'}}>
                    <Card.Body>
                        <Card.Title>Weather In {name}</Card.Title>
                        <Card.Title>For: {time}</Card.Title>
                        <Card.Text>Current Temperature: {main.temp} {'\u00b0'}F</Card.Text>
                        <Card.Text>High: {main.temp_max} {'\u00b0'}F</Card.Text>
                        <Card.Text>Low: {main.temp_min} {'\u00b0'}F</Card.Text>
                        <Card.Text>Feels Like: {main.feels_like} {'\u00b0'}F</Card.Text>
                        <Card.Text>Humidity: {main.humidity}%</Card.Text>
                        <Card.Text>Description: {weather[0].description}</Card.Text>
                        <Card.Text>Sunrise: {new Date(sys.sunrise * 1000).toLocaleTimeString('en-IN')}</Card.Text>
                        <Card.Text>Sunrise: {new Date(sys.sunset * 1000).toLocaleTimeString('en-IN')}</Card.Text>
                        <Card.Text></Card.Text>
                        <Card.Text></Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )


    }

    return (
        <Row>
            <Col/>
            <Col>
                {/* Ternary operator to ensure that the createWeatherCards function does not load UNLESS it is not undefined. */}
                {(weatherData != undefined) ? createCurrentWeatherCard() : <div>loading...</div>}
            </Col>
            <Col/>
        </Row>
    )
}

export default CurrentWeatherCards
