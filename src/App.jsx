import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PopularItems from './components/PopularItems';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import AllItems from './components/AllItems';
import Hotels from './components/Hotels';
import { getPopularItems } from './services/api';
import { FaSpinner } from 'react-icons/fa';

const App = () => {
    const [cart, setCart] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [popularItems, setPopularItems] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [isLoadingItems, setIsLoadingItems] = useState(true);

    useEffect(() => {
        const fetchPopularItems = async () => {
            setIsLoadingItems(true);
            try {
                const items = await getPopularItems();
                setPopularItems(items);
            } catch (error) {
                console.error('Error fetching popular items:', error);
            } finally {
                setIsLoadingItems(false);
            }
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
            <div className="min-h-screen bg-gradient-to-br from-[#EFEFD0] to-[#F7C59F]">
                <Navbar cartItemCount={cart.length} />
                <div className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="w-full lg:w-2/3">
                                    <div className="bg-white rounded-lg shadow-lg p-6">
                                        <h2 className="text-2xl font-bold mb-4 text-black">Popular Items</h2>
                                        {isLoadingItems ? (
                                            <div className="flex justify-center items-center h-64">
                                                <FaSpinner className="animate-spin text-4xl text-[#FF6B35]" />
                                            </div>
                                        ) : (
                                            <PopularItems items={popularItems} addToCart={addToCart} />
                                        )}
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/3">
                                    <div className="bg-white rounded-lg shadow-lg p-6">
                                        <Hotels />
                                    </div>
                                </div>
                            </div>
                        } />
                        <Route path="/cart" element={
                            <div className="bg-white rounded-lg shadow-lg p-6">
                            
                                <Cart 
                                    cart={cart} 
                                    removeFromCart={removeFromCart}
                                    updateQuantity={updateQuantity}
                                    clearCart={clearCart}
                                    orderHistory={orderHistory}
                                />
                            </div>
                        } />
                        <Route path="/all-items" element={
                            <AllItems addToCart={addToCart} />
                        } />
                    </Routes>
                </div>
                <div className="fixed bottom-4 right-4">
                    <ChatBot onRecommendations={handleRecommendations} addToCart={addToCart} />
                </div>
            </div>
        </Router>
    );
};

export default App;