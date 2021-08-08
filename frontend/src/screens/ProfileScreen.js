import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';

function ProfileScreen({ user }) {
    console.log(user);
    return (
        <div>
            <Row>
                <Col md={6}>
                    <ListGroup.Item>
                        <h3>{user.name}'s TRANSACTION HISTORY </h3>
                    </ListGroup.Item>
                    {user.transactions.map((item, idx) => {
                        return (
                            <>
                                <ListGroup.Item>
                                    Amount: {item.amount}
                                </ListGroup.Item>
                            </>
                        );
                    })}
                </Col>
                <Col md={6}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{user.name}'s ACCOUNT DETAILS</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Items owned: {user.library.length}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Public Key: {user.publicKey}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Private Key: {user.privateKey}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    );
}

export default ProfileScreen;
