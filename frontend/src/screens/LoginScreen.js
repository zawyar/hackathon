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

function LoginScreen({ login, userData }) {
    const [key, setKey] = useState('');

    async function SignIn(e) {
        e.preventDefault();
        e.preventDefault();
        let publicKey = '';
        let balance = '';
        let privateKey = '';
        const requestOptions = {
            crossDomain: true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicKey: key }),
        };
        const response = await fetch(
            'http://localhost:5000/signin',
            requestOptions
        );
        const data = await response.json();
        console.log(data);
        let username = data.name;
        publicKey = data.publicKey.substring(0, 50);
        balance = data.balance;
        privateKey = data.privateKey;
        login(username, publicKey, balance);
        userData(data);
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
