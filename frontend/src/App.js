import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import CartScreen from './screens/CartScreen';
import LibraryScreen from './screens/LibraryScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
    const [cartItems, setcartItems] = useState([]);
    const [userName, setUserName] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [balance, setBalance] = useState(0.0);
    const [user, setUser] = useState({});
    function SetLoginDetails(userName, userPublicKey, userBalance) {
        setUserName(userName);
        setPublicKey(userPublicKey);
        setBalance(userBalance);
    }
    function SetUserDetails(user) {
        setUser(user);
    }

    function addToCart(items) {
        setcartItems([...cartItems, items]);
    }
    return (
        <Router>
            <Header
                userName={userName}
                publicKey={publicKey}
                balance={balance}
            />
            <main className='py-3'>
                <Container>
                    <Route path='/' component={HomeScreen} exact />
                    <Route
                        path='/product/:id'
                        render={(props) => {
                            return (
                                <ProductScreen
                                    {...props}
                                    addToCart={addToCart}
                                />
                            );
                        }}
                    />
                    <Route
                        path='/cart'
                        render={(props) => {
                            return (
                                <CartScreen
                                    items={cartItems}
                                    user={user}
                                    userDataSetter={setUser}
                                />
                            );
                        }}
                        exact
                    />
                    <Route
                        path='/login'
                        component={() => {
                            return (
                                <LoginScreen
                                    login={SetLoginDetails}
                                    userData={setUser}
                                />
                            );
                        }}
                        exact
                    />
                    <Route
                        path='/register'
                        component={() => {
                            return (
                                <RegistrationScreen
                                    login={SetLoginDetails}
                                    userData={setUser}
                                />
                            );
                        }}
                        exact
                    />
                    <Route
                        path='/library'
                        component={() => {
                            return (
                                <LibraryScreen
                                    userName={userName}
                                    publicKey={publicKey}
                                    user={user}
                                />
                            );
                        }}
                        exact
                    />
                    <Route
                        path='/profile'
                        component={() => {
                            return <ProfileScreen user={user} />;
                        }}
                        exact
                    />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
