import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function AddTokens({ user, userDataSetter }) {
    const [key, setKey] = useState('');
    async function Add(e) {
        e.preventDefault();

        const requestOptions = {
            crossDomain: true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicKey: user.publicKey, amount: 500 }),
        };
        const response = await fetch(
            'http://localhost:5000/addTokens',
            requestOptions
        );
        const data = await response.json();
        console.log(data);
        userDataSetter(data);
    }
    return (
        <>
            <Form>
                <Form.Group className='mb-3' controlId='formBasicKey'>
                    <Form.Label>
                        <h3>Press the button to add 500 tokens</h3>
                    </Form.Label>
                </Form.Group>
                <Button
                    variant='primary'
                    type='submit'
                    onClick={(e) => {
                        Add(e);
                    }}
                >
                    Add 500 Tokens
                </Button>
            </Form>
        </>
    );
}

export default AddTokens;
