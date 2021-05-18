import { React, useState, useEffect } from 'react'
import './TextBox.css';
import { Form, Button, Row, Col } from 'react-bootstrap';

function TextBox(props) {

    

    

    return (
        <Row>
            <Col>
                <Form>
                    <Form.Control onChange={props.handleChange} name="userInput" type="text" placeholder="Enter City..." value={props.values}></Form.Control>
                    <Button>Enter</Button>
                </Form>
            </Col>
        </Row>
    )
}

export default TextBox;
