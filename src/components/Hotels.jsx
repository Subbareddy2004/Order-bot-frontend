import React, { useState, useEffect } from 'react';
import { getNearbyHotels } from '../services/api';
import { FaMapMarkerAlt, FaPhone, FaUtensils, FaHome, FaSpinner } from 'react-icons/fa';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          fetchNearbyHotels(latitude, longitude);
        },
        error => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  };

  const fetchNearbyHotels = async (latitude, longitude) => {
    try {
      setIsLoading(true);
      const nearbyHotels = await getNearbyHotels(latitude, longitude);
      setHotels(nearbyHotels);
    } catch (error) {
      console.error("Error fetching nearby hotels:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="nearby-hotels">
      <h2 className="text-2xl font-bold mb-4">Nearby Hotels</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-[#FF6B35]" />
        </div>
      ) : (
        hotels.map(hotel => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-xl font-semibold">{hotel.name}</h3>
            <div className="flex items-center mt-2">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <p className="text-gray-600">{hotel.address}</p>
            </div>
            <div className="flex items-center mt-2">
              <FaPhone className="text-gray-500 mr-2" />
              <p className="text-gray-600">{hotel.phone}</p>
            </div>
            <div className="flex items-center mt-2">
              {hotel.type === 'restaurant' ? (
                <FaUtensils className="text-gray-500 mr-2" />
              ) : (
                <FaHome className="text-gray-500 mr-2" />
              )}
              <p className="text-gray-600">{hotel.type === 'restaurant' ? 'Restaurant' : 'Homemade'}</p>
            </div>
            {hotel.distance !== undefined && (
              <p className="text-gray-600 mt-2">Distance: {hotel.distance.toFixed(2)} km</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Hotels;