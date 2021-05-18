import { React, useState, useEffect } from 'react'
import './TextBox.css';
import { Form, Button, Row, Col } from 'react-bootstrap';

function TextBox(props) {

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
