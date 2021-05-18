import React from 'react';
import { Navbar } from 'react-bootstrap'

function Nav() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home" >MyWeather</Navbar.Brand>
            </Navbar>
        </div>
    )
}

export default Nav

