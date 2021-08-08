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

function RegistrationScreen({ login, userData }) {
    const [username, setUsername] = useState('');
    let printData = <></>;
    async function SignUp(e) {
        e.preventDefault();
        let publicKey = '';
        let balance = '';
        let privateKey = '';
        const requestOptions = {
            crossDomain: true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username }),
        };
        const response = await fetch(
            'http://localhost:5000/signup',
            requestOptions
        );
        const data = await response.json();
        console.log(data);
        publicKey = data.user.publicKey.substring(0, 50);
        balance = data.user.balance;
        privateKey = data.user.privateKey;
        login(username, publicKey, balance);
        userData(data.user);
    }

    return (
        <>
            <Form>
                <Form.Group className='mb-3' controlId='formBasicKey'>
                    <Form.Label>Public Key</Form.Label>
                    <Form.Control
                        size='lg'
                        type='text'
                        placeholder='Enter name'
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </Form.Group>
                <Button
                    variant='primary'
                    type='submit'
                    onClick={(e) => {
                        SignUp(e);
                    }}
                >
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default RegistrationScreen;
