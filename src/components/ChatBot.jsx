import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaStar, FaPlus, FaSpinner } from 'react-icons/fa';
import { sendMessage, getPersonalizedRecommendations } from '../services/api';

const ChatBot = ({ onRecommendations, addToCart }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [mealType, setMealType] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setMessages([{ text: "Welcome! What type of meal are you looking for?", sender: 'bot' }]);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, recommendations]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleMealTypeSelect = async (type) => {
        setMealType(type);
        setMessages(prev => [...prev, { text: type, sender: 'user' }, { text: `Great! Here are some ${type} options for you.`, sender: 'bot' }]);
        setIsLoading(true);
        try {
            const recs = await getPersonalizedRecommendations('', type);
            setRecommendations(recs);
            onRecommendations(recs);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await sendMessage(input);
            const botMessage = { text: response.message, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
            
            const recs = await getPersonalizedRecommendations(input, mealType);
            setRecommendations(recs);
            onRecommendations(recs);
        } catch (error) {
            console.error('Error sending message:', error);
        }

        setInput('');
    };

    const RecommendedItem = ({ item }) => (
        <div className="bg-white rounded-lg shadow-sm p-2 mb-2 flex items-center">
            <img src={item.productImg} alt={item.productTitle} className="w-16 h-16 object-cover rounded-lg mr-2" />
            <div className="flex-grow">
                <h4 className="font-semibold">{item.productTitle}</h4>
                <p className="text-sm text-gray-600">₹{item.productPrice}</p>
                <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-sm">{item.productRating.toFixed(1)}</span>
                </div>
            </div>
            <button 
                onClick={() => {
                    addToCart(item, 1);
                    setMessages(prev => [...prev, { text: `Added ${item.productTitle} to cart`, sender: 'bot' }]);
                }}
                className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition duration-300"
            >
                <FaPlus />
            </button>
        </div>
    );

    return (
        <div className={`fixed bottom-4 right-4 z-50 ${isOpen ? 'w-80' : 'w-auto'}`}>
            {!isOpen && (
                <button 
                    className="bg-[#FF6B35] text-white p-3 rounded-full shadow-lg hover:bg-[#F7C59F] hover:text-[#004E89] transition duration-300"
                    onClick={toggleChat}
                >
                    <FaComments size={24} />
                </button>
            )}
            {isOpen && (
                <div className="bg-[#FF6B35] text-white p-4 flex justify-between items-center">
                    <h3 className="font-bold">Chat with Bot</h3>
                    <button onClick={toggleChat} className="text-white hover:text-[#F7C59F]">
                        <FaTimes size={20} />
                    </button>
                </div>
            )}
            {isOpen && (
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="h-96 overflow-y-auto p-4 bg-gray-100">
                        {messages.map((message, index) => (
                            <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                <div className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-[#004E89] text-white' : 'bg-[#F7C59F] text-[#333333]'}`}>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="text-center py-2">
                                <FaSpinner className="animate-spin inline-block mr-2 text-[#FF6B35]" />
                                <span className="text-[#004E89]">Finding items...</span>
                            </div>
                        )}
                        {!mealType && (
                            <div className="flex justify-center space-x-2 mt-4">
                                {['breakfast', 'lunch', 'dinner'].map((type) => (
                                    <button 
                                        key={type}
                                        onClick={() => handleMealTypeSelect(type)}
                                        className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm hover:bg-[#F7C59F] hover:text-[#004E89] transition duration-300"
                                    >
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </button>
                                ))}
                            </div>
                        )}
                        {recommendations.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold mb-2">Recommended Items:</h4>
                                {recommendations.map((item) => (
                                    <RecommendedItem key={item.id} item={item} />
                                ))}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 bg-gray-200">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button 
                                onClick={handleSend}
                                className="bg-[#FF6B35] text-white p-2 rounded-r-lg hover:bg-[#F7C59F] hover:text-[#004E89] transition duration-300"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;