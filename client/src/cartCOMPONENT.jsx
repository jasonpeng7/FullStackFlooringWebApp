import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {motion} from "framer-motion";

function CartComponent({ cartOpen, toggleCart }) {
  const [cartItem, setCartItem] = useState([]); //empty cart array
  const [errorMessage, setErrorMessage] = useState('');

  //fetch current cart items
  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cart");
      setCartItem(response.data);
    } catch (error) {
      console.error("Error grabbing items", error);
    }
  };


  const totalCost = () => {
    return cartItem.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  }

  const clearCart = async () => {
    try{
        await axios.post("http://localhost:8080/cart/clear");
        setCartItem([]);
    }
    catch (error) {
        setErrorMessage("Failed to clear cart. Please try again.");
    }
  }
  
  const removeItems = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/cart/${id}`);
        fetchCartItems();
        setCartItem(prevItems => {
            const itemIndex = prevItems.findIndex(item => item.id === id);
            if (itemIndex >= 0) {
                const updatedItem = { ...prevItems[itemIndex], quantity: prevItems[itemIndex].quantity - 1 };

                // If the quantity reaches zero, remove the item from the cart
                if (updatedItem.quantity <= 0) {
                    return prevItems.filter(item => item.id !== id);
                }
                return [
                    ...prevItems.slice(0, itemIndex),
                    updatedItem,
                    ...prevItems.slice(itemIndex + 1)
                ];
            }
            return prevItems; // If not found, return previous items
        });
        } catch (error) {
            setErrorMessage("Failed to remove item from cart. Please try again.");
        }
    };

    //dependency changes
    useEffect(() => {
        if (cartOpen) {
            fetchCartItems();
        }},[cartOpen]);



  return (
<>
  {/* open cart modal  */}
  {cartOpen && (
    
    // grey overlay
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"> 
        {/* outer modal(aesthetic border) */}
        <div className='cart-modal bg-stone900 w-10/12 h-5/6 p-0.5 relative flex rounded'>
            {/* left side of cart modal */}
            <div className='w-4/5 bg-customBone flex flex-col space-y-4 min-h-full fill p-10 overflow-y-auto'>
                <h1 className='text-5xl text-left text-black raleway mb-10'>My Cart</h1>
                <div className="text-sm text-black text-left raleway">
                    Total Cost: ${totalCost()}
                </div>
                {/* create row via map... make sure info and remove button on same row */}
                {cartItem.length > 0 ? (
                cartItem.map((item, index) => (
                    <div key={index} className="text-black flex justify-between items-left p-4">
                        <div className="flex-grow text-left"> {/* This allows the text to be left-aligned */}
                            <img src={item.imageURL} alt={`Vinyl Flooring ${index + 1}`} className="w-10 h-10 mr-5" />
                            <p className="text-lg sono">{item.type} ({item.color}) - ${item.price}</p>
                            <p className="text-lg sono"> Quantity: [{item.quantity}]</p>
                        </div>
                        <motion.button onClick={() => removeItems(item.id)} whileTap={{scale: 0.5}} className="mt-2 h-fit sm:w-fit ml-4 bg-inherit shadow-xl text-black hover:bg-red-400 transition">Remove</motion.button>
                    </div>
                ))) : 
                (<p className='sono text-black'>Cart is currently empty.</p>)
                }
            </div>

            <div className="border-l border-black h-full" style={{ width: '1px' }}></div> {/* Vertical Divider */}
            
            {/* right side of cart modal */}
            <div className='w-1/5 h-auto flex flex-col bg-customBone p-10 overflow-y-hidden relative'>
                <button className='absolute top-0 right-0 w-fit bg-transparent text-black' onClick={toggleCart}>Close</button>
                {cartItem.length > 0 && (
                <button onClick={clearCart} className="sm:text-xs bg-white text-black px-4 py-2 rounded mt-4 hover:bg-red-700 transition">Clear Cart</button>
                )}
            </div>

            {/* error handling*/}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
    </div>


)}
</>
  );
}

export default CartComponent;
