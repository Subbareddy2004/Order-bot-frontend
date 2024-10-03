import React from 'react';
import { FaStar, FaMinus, FaPlus, FaLeaf } from 'react-icons/fa';

const MenuItem = ({ item, addToCart }) => {
    const [quantity, setQuantity] = React.useState(0);

    const handleAdd = () => {
        if (quantity > 0) {
            addToCart(item, quantity);
            setQuantity(0);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row">
            <img src={item.productImg} alt={item.productTitle} className="w-full md:w-1/3 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-4" />
            <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2">{item.productTitle}</h3>
                <div className="flex items-center mb-2">
                    <FaStar className="text-[#FF6B35] mr-1" />
                    <span className="text-[#0f0f0f]">{item.productRating.toFixed(1)} ratings</span>
                </div>
                <p className="text-gray-600 mb-2">{item.productDesc}</p>
                <div className="flex items-center mb-2">
                    <span className="font-bold text-lg mr-2 text-[#111111]">₹{item.productPrice}</span>
                    {item.productOffer > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                            ₹{Math.round(item.productPrice / (1 - item.productOffer / 100))}
                        </span>
                    )}
                </div>
                <p className="text-sm text-gray-500 mb-2">Prep Time: {item.productPrepTime}</p>
                <p className="flex items-center mb-4">
                    {item.isVeg ? (
                        <>
                            <FaLeaf className="text-green-500 mr-1" />
                            <span className="text-green-500">Veg</span>
                        </>
                    ) : (
                        <span className="text-red-500">Non-Veg</span>
                    )}
                </p>
                <div className="flex items-center">
                    <div className="flex items-center mr-4">
                        <button onClick={() => setQuantity(Math.max(0, quantity - 1))} className="bg-[#F7C59F] text-[#080808] px-2 py-1 rounded-l">
                            <FaMinus />
                        </button>
                        <span className="bg-[#F7C59F] text-[#101010] px-4 py-1">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="bg-[#F7C59F] text-[#131414] px-2 py-1 rounded-r">
                            <FaPlus />
                        </button>
                    </div>
                    <button onClick={handleAdd} className="bg-[#FF6B35] text-white px-4 py-2 rounded hover:bg-[#F7C59F] hover:text-[#121212] transition duration-300" disabled={quantity === 0}>
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );
};

const PopularItems = ({ items, addToCart }) => {
    return (
        <div className="popular-items">
            {/* <h2 className="text-2xl font-bold mb-4 text-black">Popular Items</h2> */}
            {items.map(item => (
                <MenuItem key={item.id} item={item} addToCart={addToCart} />
            ))}
        </div>
    );
};

export default PopularItems;