import React, { useState } from 'react';
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';

function CartScreen({ items, userDataSetter, user }) {
    const [key, setKey] = useState('');
    async function Checkout(e) {
        e.preventDefault();
        let amount = 0;
        let productsList = items.map((item) => {
            amount = amount + item.price;
            return item._id;
        });
        const requestOptions = {
            crossDomain: true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                privateKey: key,
                publicKey: user.publicKey,
                products: productsList,
                amount: amount,
            }),
        };
        const response = await fetch(
            'http://localhost:5000/checkout',
            requestOptions
        );
        const data = await response.json();
        console.log(data);

        userDataSetter(data);
    }
    return (
        <Row>
            <Col md={3}></Col>
            <Col md={6}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>CART</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {items.map((product, idx) => {
                            return (
                                <>
                                    <Row>
                                        <Col>Price: ${product.price}</Col>
                                        <Col>Name: {product.name}</Col>
                                    </Row>
                                </>
                            );
                        })}
                    </ListGroup.Item>
                    <Form>
                        <Form.Group className='mb-3' controlId='formBasicKey'>
                            <Form.Label>Private Key</Form.Label>
                            <Form.Control
                                size='lg'
                                type='text'
                                placeholder='Enter private key'
                                onChange={(e) => {
                                    setKey(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Button
                            variant='primary'
                            type='submit'
                            onClick={(e) => {
                                Checkout(e);
                            }}
                        >
                            Checkout
                        </Button>
                    </Form>
                </ListGroup>
            </Col>
            <Col md={3}></Col>
        </Row>
    );
}

export default CartScreen;
