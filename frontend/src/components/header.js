import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = ({ userName, publicKey, balance }) => {
    let options = '';
    if (publicKey !== '') {
        options = (
            <>
                <LinkContainer to='/profile'>
                    <Nav.Link>
                        <i className='fas fa-user'></i>
                        {userName}
                    </Nav.Link>
                </LinkContainer>
                <Navbar.Text>
                    <i className='fas fa-bitcoin'></i> Balance:{' '}
                    <a href='#login'>{balance}</a>
                </Navbar.Text>
                <Navbar.Text>
                    <i className='fas fa-key'></i>Public Key:
                    <a href='#login'>{publicKey}</a>
                </Navbar.Text>
                <LinkContainer to='/cart'>
                    <Nav.Link>
                        <i className='fas fa-shopping-cart'></i>Cart
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/library'>
                    <Nav.Link>
                        <i className='fas fa-list'></i>Your Library
                    </Nav.Link>
                </LinkContainer>
            </>
        );
    } else {
        options = (
            <>
                <LinkContainer to='/login'>
                    <Nav.Link>
                        <i className='fas fa-user'></i>Sign In
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/register'>
                    <Nav.Link>
                        <i className='fas fa-user'></i>Sign Up
                    </Nav.Link>
                </LinkContainer>
            </>
        );
    }
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>CodeShop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>{options}</Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
