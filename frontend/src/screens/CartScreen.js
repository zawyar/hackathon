import React from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';

function CartScreen({ items }) {
    async function Checkout() {}
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

                    <Button className='btn-block' type='button'>
                        Checkout
                    </Button>
                </ListGroup>
            </Col>
            <Col md={3}></Col>
        </Row>
    );
}

export default CartScreen;
