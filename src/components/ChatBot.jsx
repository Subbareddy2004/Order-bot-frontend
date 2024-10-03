import React, { useState, useEffect } from 'react';
import { FaStar, FaComments, FaTimes, FaSpinner, FaPlus, FaLeaf, FaDrumstickBite } from 'react-icons/fa';
import { sendMessage } from '../services/api';

const MenuItem = ({ item, addToCart }) => {
    return (
        <div className="chat-menu-item">
            <img src={item.productImg} alt={item.productTitle} className="chat-item-image" />
            <div className="chat-item-details">
                <h4>{item.productTitle}</h4>
                <div className="chat-item-info">
                    <div className="chat-item-rating">
                        <FaStar />
                        <span>{item.productRating.toFixed(1)}</span>
                    </div>
                    <span className="chat-item-price">₹{item.productPrice}</span>
                </div>
            </div>
            <button onClick={() => addToCart(item, 1)} className="chat-add-button">
                <FaPlus />
            </button>
        </div>
    );
};

const ChatBot = ({ onRecommendations, addToCart }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [mealType, setMealType] = useState('');

    useEffect(() => {
        setMessages([{ text: "Welcome! What type of meal are you looking for?", sender: 'bot' }]);
    }, []);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await sendMessage(input);
            const botMessage = { text: response.message, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
            
            const recommendedItems = response.recommendations;
            setRecommendations(recommendedItems.slice(0, 5)); // Get top 5 recommendations
            onRecommendations(recommendedItems);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { text: "Sorry, I couldn't process your request. Please try again.", sender: 'bot' }]);
        } finally {
            setIsLoading(false);
        }

        setInput('');
    };

    const handleMealTypeSelect = async (type) => {
        setMealType(type);
        setMessages(prev => [...prev, { text: `Great! Let's find some ${type} options for you.`, sender: 'bot' }]);
        setIsLoading(true);

        try {
            const response = await sendMessage(`Show me ${type} options`);
            setRecommendations(response.recommendations.slice(0, 5));
            onRecommendations(response.recommendations);
        } catch (error) {
            console.error('Error getting recommendations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {!isOpen && (
                <button className="chat-bot-toggle" onClick={() => setIsOpen(true)}>
                    <FaComments />
                </button>
            )}
            {isOpen && (
                <div className="chat-bot">
                    <div className="chat-header">
                        <h3>Chat with us</h3>
                        <button className="close-chat" onClick={() => setIsOpen(false)}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender}`}>
                                {message.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message bot">
                                <FaSpinner className="fa-spin" /> Finding Items...
                            </div>
                        )}
                        {!mealType && (
                            <div className="meal-type-buttons">
                                <button onClick={() => handleMealTypeSelect('breakfast')}>Breakfast</button>
                                <button onClick={() => handleMealTypeSelect('lunch')}>Lunch</button>
                                <button onClick={() => handleMealTypeSelect('dinner')}>Dinner</button>
                            </div>
                        )}
                        {recommendations.length > 0 && (
                            <div className="chat-recommendations">
                                <h3>Recommended Items:</h3>
                                <div className="chat-menu-items">
                                    {recommendations.map(item => (
                                        <MenuItem key={item.id} item={item} addToCart={addToCart} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Search for meals or dishes..."
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;