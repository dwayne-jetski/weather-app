import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';


function WeatherCards(weatherData) {

    useEffect(()=> {
        
    }, [weatherData])

    const createWeatherCards = () => {

        const {name, main, weather, sys} = weatherData.data;

        let newDate = new Date();
        const time = newDate.toLocaleString();



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
                {(weatherData != undefined) ? createWeatherCards() : <div>loading...</div>}
            </Col>
            <Col/>
        </Row>
    )
}

export default WeatherCards
