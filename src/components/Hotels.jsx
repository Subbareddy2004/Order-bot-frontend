import React, { useState, useEffect } from 'react';
import { fetchHotels } from '../services/firebaseOperations';
import { FaStar, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const loadHotels = async () => {
            const hotelData = await fetchHotels();
            setHotels(hotelData);
        };
        loadHotels();
    }, []);

    return (
        <div className="hotels-container">
            <h2>Featured Restaurants</h2>
            <div className="hotels-grid">
                {hotels.map((hotel) => (
                    <div key={hotel.id} className="hotel-card">
                        <h3>{hotel.hotelName}</h3>
                        <p><FaMapMarkerAlt /> {hotel.hotelAddress}</p>
                        <p><FaPhone /> {hotel.hotelPhoneNo}</p>
                        <p><FaStar /> {hotel.hotelType}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hotels;