import React from 'react';
import { Col, Navbar } from 'react-bootstrap'

function Nav() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Col xs={5}/>
                <Col xs={2}>
                    <Navbar.Brand href="#home" >MyWeather</Navbar.Brand>
                </Col>
                <Col xs={5} />
            </Navbar>
        </div>
    )
}

export default Nav

