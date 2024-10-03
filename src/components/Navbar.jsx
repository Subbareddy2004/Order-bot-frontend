import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ cartItemCount }) => {
    return (
        <nav className="bg-[#FF6B35] text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">Food Ordering App</Link>
                <div className="flex items-center space-x-4">
                    <Link to="/" className="hover:text-[#F7C59F]">Home</Link>
                    <Link to="/all-items" className="hover:text-[#F7C59F]">View Menu</Link>
                    <Link to="/cart" className="flex items-center hover:text-[#F7C59F]">
                        <FaShoppingCart className="mr-1" />
                        Cart
                        {cartItemCount > 0 && (
                            <span className="ml-1 bg-[#004E89] text-white rounded-full px-2 py-1 text-xs">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;