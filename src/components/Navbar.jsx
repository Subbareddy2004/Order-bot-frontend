import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Navbar = () => {
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        getUserLocation();
    }, []);

    const getUserLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                error => {
                    console.error("Error getting user location:", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by your browser.");
        }
    };

    return (
        <nav className="bg-[#FF6B35] p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-white text-2xl font-bold mr-4">Food Ordering App</h1>
                    {userLocation && (
                        <div className="text-white flex items-center">
                            <FaMapMarkerAlt className="mr-2" />
                            <span>{userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center">
                    <Link to="/" className="text-white mr-4">Home</Link>
                    <Link to="/menu" className="text-white mr-4">View Menu</Link>
                    <Link to="/cart" className="text-white">Cart</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;