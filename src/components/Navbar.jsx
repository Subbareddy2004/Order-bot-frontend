import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ cartItemCount }) => {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo">Food Ordering App</Link>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/cart" className="nav-link nav-cart">
                    <FaShoppingCart />
                    {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;