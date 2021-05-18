import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

function WeatherForcastCards(weatherForecast) {


    const CreateWeatherForcastCards = () => {

        console.log("FORECAST IN COMPONENT: ",weatherForecast.data.list)

        const forecastData = weatherForecast.data.list.filter((e, i) => i % 8 === 8 - 3);

        console.log(forecastData)

        return forecastData.map((data) => {
            const { main, dt, weather } = data;
            let time = new Date(dt * 1000);
            time = time.toUTCString();

            return(
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Text>{time}</Card.Text>
                            <Card.Text>High:{main.temp_max} </Card.Text>
                            <Card.Text>Low: {main.min_temp}</Card.Text>
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
            {(weatherForecast.data.list != undefined) ? CreateWeatherForcastCards() : <div>loading...</div>}
        </Row>
    )
}

export default WeatherForcastCards
