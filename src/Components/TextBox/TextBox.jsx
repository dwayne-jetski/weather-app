import { React, useState, useEffect } from 'react'
import './TextBox.css';
import { Form, Button, Row, Col } from 'react-bootstrap';

/* This text box is to handle the user input for looking up weather in certain cities */

function TextBox(props) {

    /* it uses the handleSubmit and handleChange funcitons as well as the values hook from App.js */
    return (
        <Row>
            <Col>
                <Form onSubmit={props.handleSubmit} >
                    <Row>
                        <Form.Control inline onChange={props.handleChange} name="userInput" type="text" placeholder="Enter City..." value={props.values}></Form.Control>
                        <Button inline variant="dark" type="submit" >Enter</Button>
                    </Row>
                </Form>
            </Col>
        </Row>
    )
}

export default TextBox;
