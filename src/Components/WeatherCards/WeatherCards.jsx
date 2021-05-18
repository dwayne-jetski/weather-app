import React, { useState, useEffect } from 'react';


function WeatherCards(weatherData) {


    useEffect(()=> {
        console.log("WEATHER!: ", weatherData)
    }, [weatherData])

    return (
        <div>
            {JSON.stringify(weatherData)}
        </div>
    )
}

export default WeatherCards
