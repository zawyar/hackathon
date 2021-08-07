import React, { useState } from 'react';
import {
    Button,
    Card,
    Col,
    Form,
    ListGroup,
    ListGroupItem,
    Row,
} from 'react-bootstrap';

function LoginScreen({ login }) {
    const [key, setKey] = useState('');

    async function SignIn(e) {
        e.preventDefault();
        login('Zawyar', '134890ysdaklfh3q9-sd', 123.432);
        //let userName = await fetch();
    }
    return (
        <>
            <Form>
                <Form.Group className='mb-3' controlId='formBasicKey'>
                    <Form.Label>Public Key</Form.Label>
                    <Form.Control
                        size='lg'
                        type='text'
                        placeholder='Enter public key'
                        onChange={(e) => {
                            setKey(e.target.value);
                        }}
                    />
                </Form.Group>
                <Button
                    variant='primary'
                    type='submit'
                    onClick={(e) => {
                        SignIn(e);
                    }}
                >
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default LoginScreen;
