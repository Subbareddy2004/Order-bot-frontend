import React from 'react';
import { FaShoppingCart, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = ({ cart, removeFromCart, updateQuantity, clearCart, orderHistory = [] }) => {
    const totalPrice = cart.reduce((total, item) => total + (item.productPrice || 0) * item.quantity, 0);

    return (
        <div className="cart-page">
            <h2><FaShoppingCart /> Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.productImg} alt={item.productTitle} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.productTitle}</h3>
                                <div className="quantity-control">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><FaMinus /></button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><FaPlus /></button>
                                </div>
                                <p>Price: ₹{(item.productPrice || 0) * item.quantity}</p>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="remove-item">
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    <div className="cart-summary">
                        <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
                        <button onClick={clearCart} className="clear-cart">Clear Cart</button>
                        <button className="checkout">Proceed to Checkout</button>
                    </div>
                </>
            )}

            <h2>Order History</h2>
            {orderHistory.length === 0 ? (
                <p>No previous orders</p>
            ) : (
                <div className="order-history">
                    {orderHistory.map((order, index) => (
                        <div key={index} className="past-order">
                            <h3>Order #{order.id}</h3>
                            <p>Date: {new Date(order.date).toLocaleString()}</p>
                            <p>Total: ₹{order.total.toFixed(2)}</p>
                            <ul>
                                {order.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>{item.productTitle} x {item.quantity}</li>
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