import { React, useState, useEffect } from 'react'
import './TextBox.css';
import { Form, Button, Row, Col } from 'react-bootstrap';

function TextBox() {

    const [ values, setValues ] = useState({});

    const handleChange = (event) => {

        event.persist();

        setValues(values => ({...values, [event.target.name]: event.target.value}));

        console.log(values);
    }

    return (
        <Row>
            <Col>
                <Form>
                    <Form.Control onChange={handleChange} name="userInput" type="text" placeholder="Enter City..." value={values.userInput}></Form.Control>
                    <Button>Enter</Button>
                </Form>
            </Col>
        </Row>
    )
}

export default TextBox;
