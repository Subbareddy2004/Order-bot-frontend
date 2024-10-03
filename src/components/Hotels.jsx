import React, { useState, useEffect } from 'react';
import { fetchHotels } from '../services/firebaseOperations';
import { FaStar, FaMapMarkerAlt, FaPhone, FaSpinner } from 'react-icons/fa';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadHotels = async () => {
            setIsLoading(true);
            try {
                const hotelData = await fetchHotels();
                setHotels(hotelData);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadHotels();
    }, []);

    return (
        <div className="hotels-container">
            <h2 className="text-2xl font-bold mb-4 text-black">Nearby Hotels</h2>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <FaSpinner className="animate-spin text-4xl text-[#FF6B35]" />
                </div>
            ) : (
                <div className="space-y-4">
                    {hotels.map((hotel) => (
                        <div key={hotel.id} className="bg-white rounded-lg shadow-md p-4 flex items-center">
                            <img src={hotel.image} alt={hotel.hotelName} className="w-20 h-20 object-cover rounded-full mr-4" />
                            <div>
                                <h3 className="text-lg font-semibold">{hotel.hotelName}</h3>
                                <p className="text-gray-600"><FaMapMarkerAlt className="inline mr-1" /> {hotel.hotelAddress}</p>
                                <p className="text-gray-600"><FaPhone className="inline mr-1" /> {hotel.hotelPhoneNo}</p>
                                <p className="text-yellow-500"><FaStar className="inline mr-1" /> {hotel.hotelType}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Hotels;