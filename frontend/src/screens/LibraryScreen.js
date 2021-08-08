import React from 'react';
import { Col, Row } from 'react-bootstrap';
import products from '../products';
import Product from '../components/Product';
const LibraryScreen = ({ userName, publicKey, user }) => {
    console.log(user.library);
    if (!user.library) {
        user.library = [];
    }
    let output = products.map((product, index) => {
        if (user.library.find((item) => product._id == item)) {
            console.log('match');
            return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            );
        } else {
            return '';
        }
    });
    return (
        <>
            <h1>{userName}'s Library</h1>
            <Row>{output}</Row>
        </>
    );
};

export default LibraryScreen;
