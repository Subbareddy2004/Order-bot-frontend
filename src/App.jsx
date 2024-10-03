import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PopularItems from './components/PopularItems';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import { getPopularItems } from './services/api';
import './App.css';

const App = () => {
    const [cart, setCart] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [popularItems, setPopularItems] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchPopularItems = async () => {
            const items = await getPopularItems();
            setPopularItems(items);
        };
        fetchPopularItems();
    }, []);

    const addToCart = (item, quantity) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity === 0) {
            removeFromCart(itemId);
        } else {
            setCart(prevCart => prevCart.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const handleRecommendations = (items) => {
        setRecommendations(items);
    };

    return (
        <Router>
            <div className="app-container">
                <Navbar cartItemCount={cart.length} />
                <Routes>
                    <Route path="/" element={
                        <div className="content-wrapper">
                            <PopularItems items={popularItems} addToCart={addToCart} />
                        </div>
                    } />
                    <Route path="/cart" element={
                        <Cart 
                            cart={cart} 
                            removeFromCart={removeFromCart}
                            updateQuantity={updateQuantity}
                            clearCart={clearCart}
                            orderHistory={orderHistory}
                        />
                    } />
                </Routes>
                <ChatBot onRecommendations={handleRecommendations} addToCart={addToCart} />
            </div>
        </Router>
    );
};

export default App;