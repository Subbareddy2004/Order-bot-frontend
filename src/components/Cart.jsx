import React from 'react';
import { FaShoppingCart, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = ({ cart, removeFromCart, updateQuantity, clearCart, orderHistory = [] }) => {
    const totalPrice = cart.reduce((total, item) => total + (item.productPrice || 0) * item.quantity, 0);

    return (
        <div className="cart-page">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-[#004E89]"><FaShoppingCart className="mr-2 text-[#FF6B35]" /> Your Cart</h2>
            {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
                            <img src={item.productImg} alt={item.productTitle} className="w-20 h-20 object-cover rounded-md mr-4" />
                            <div className="flex-grow">
                                <h3 className="font-semibold">{item.productTitle}</h3>
                                <p className="text-[#004E89]">₹{(item.productPrice || 0) * item.quantity}</p>
                                <div className="flex items-center mt-2">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-[#FF6B35] hover:text-[#004E89]">
                                        <FaMinus />
                                    </button>
                                    <span className="mx-2 text-[#004E89]">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-[#FF6B35] hover:text-[#004E89]">
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    <div className="mt-6">
                        <h3 className="text-xl font-bold text-[#004E89]">Total: ₹{totalPrice.toFixed(2)}</h3>
                        <div className="mt-4 flex space-x-4">
                            <button onClick={clearCart} className="bg-[#FF6B35] text-white px-4 py-2 rounded hover:bg-[#F7C59F] hover:text-[#004E89] transition duration-300">
                                Clear Cart
                            </button>
                            <button className="bg-[#004E89] text-white px-4 py-2 rounded hover:bg-[#F7C59F] hover:text-[#004E89] transition duration-300">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}

            <h2 className="text-2xl font-bold mt-12 mb-4 text-[#004E89]">Order History</h2>
            {orderHistory.length === 0 ? (
                <p className="text-gray-600">No previous orders</p>
            ) : (
                <div className="space-y-6">
                    {orderHistory.map((order, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-semibold">Order #{order.id}</h3>
                            <p className="text-gray-600">Date: {new Date(order.date).toLocaleString()}</p>
                            <p className="font-bold mt-2">Total: ₹{order.total.toFixed(2)}</p>
                            <ul className="mt-2 space-y-1">
                                {order.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="text-sm text-gray-600">
                                        {item.productTitle} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;