import React from 'react';
import {motion} from "framer-motion";


const floorDescription = [
  "Experience the timeless elegance of oak with the durability of vinyl. This low-maintenance flooring mimics the natural beauty of wood while offering superior resistance to moisture, scratches, and wear. Ideal for high-traffic areas or households with kids and pets, it’s the perfect combination of style and practicality.",
  "Elevate your space with the sophisticated look of ash wood, delivered through the affordable, durable option of laminate. This flooring is resistant to stains, scratches, and fading, making it ideal for busy homes. Its easy installation and sleek finish bring warmth and character to any room.",
  "Bring the serene beauty of natural wood into your home with engineered wood in a tranquil Oasis shade. This premium material provides the authentic feel of hardwood with enhanced stability and moisture resistance, perfect for areas like basements or kitchens where solid wood might struggle.",
  "Achieve the luxurious aesthetic of oak wood with the durability of tile. This luxury woodlook tile offers a sophisticated yet practical flooring option, combining the charm of natural wood with the water and scratch resistance of tile. Perfect for bathrooms, kitchens, and high-moisture spaces.",
  "Infuse your home with the rich, inviting tones of brown maple, paired with the outstanding durability of luxury vinyl. Soft underfoot, yet tough enough to withstand heavy foot traffic, this flooring is waterproof, easy to maintain, and designed to look and feel like authentic wood.",
  "Embrace the warm, rustic elegance of engineered hardwood in a rich Rust color. Designed to bring out the natural beauty of wood grains, this flooring is crafted for both beauty and strength, offering a more durable and moisture-resistant alternative to traditional hardwood.",
  "Celebrate the beauty of the changing seasons with solid hardwood in a warm Autumn hue. Known for its longevity and natural authenticity, this traditional hardwood adds unparalleled value to your home, with the ability to be refinished and restored to maintain its stunning look for years.",
  "Introduce a unique, eco-friendly flair to your space with bamboo parquet flooring. Known for its striking geometric patterns and renewable nature, bamboo parquet is both stylish and sustainable. Its strength and moisture resistance make it an ideal choice for environmentally conscious homeowners looking for modern elegance."
];

const keyTakeaways = [
  ["Durable and low-maintenance", "Moisture and scratch resistant", "Mimics the natural beauty of wood"],
  ["Stain and scratch resistant", "Affordable and stylish", "Easy installation"],
  ["Authentic wood feel", "Enhanced stability", "Moisture resistant"],
  ["Sophisticated wood look", "Water and scratch resistant", "Ideal for high-moisture spaces"],
  ["Rich and inviting tones", "Waterproof", "Easy to maintain"],
  ["Rustic elegance", "Durable and moisture resistant", "Beautiful wood grain"],
  ["Timeless and authentic", "Longevity and refinishable", "Adds value to your home"],
  ["Eco-friendly and sustainable", "Striking geometric patterns", "Strong and moisture resistant"]
];

//item refers to flooring details(all the details of the flooring included in my backend)
function Modal({item, Close, addToCart}) {
    const index = item?.id - 1; // use to iterate over array description

    if (!item) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">

          <div className="bg-gradient-to-r from-neutral100 to-neutral400 h-[90vh] w-10/12 max-w-6xl p-6 rounded-lg shadow-lg relative flex">

            <button className="hover:bg-red-400 absolute top-5 right-5 text-black bg-inherit raleway font-bold" onClick={Close}>Close</button> 

            {/* left of MOdal */}
            <div className='hover:bg-gradient-to-b w-3/5 p-6 overflow-y-auto max-h-full'> 
              <h2 className="bg-inherit shadow-xl p-1 text-3xl text-black text-left w-fit manjari-thin">{item.type}</h2>
              <img src={item.displayExampleURL} alt={item.type} className="h-auto w-auto max-h-96 rounded-sm mt-12"/>
              <div className='border-t border-black mt-10 w-16'></div>
              <p className='text-sm text-black justify-start text-left ml-0 mt-10 mb-10 urbanist-regular'>{floorDescription[index]}</p>
            </div>

            {/* middle offset divider*/}
            <div class="border-r border-black mx-4 h-full"></div>

            {/* Right side of Modal */}
            <div className=" hover:bg-gradient-to-b w-2/5 flex flex-col justify-center items-center overflow-y-auto overflow-x-hidden max-h-full">
              <ul className='list-disc mx-8 mb-8 mt-15 text-left text-xl urbanist-regular'>
                  {keyTakeaways[index].map((feature, idx) => (
                    <li key={idx} className="text-black">{feature}</li>
                  ))}
              </ul>
              
              <div className='justify-start text-left bg-inherit shadow-2xl titillium-regular'>
                <p className="text-black  ml-1">Color: {item.color}</p>
                <p className="text-black  ml-1">Price: ${item.price} per sq.ft.</p>
              </div>

              <motion.button className="text-white py-2 px-4 rounded mt-4 w-2/12 absolute right-10 bottom-10 hover:bg-green-400" onClick={() => addToCart(item)} whileTap={{ scale: 0.85 }}>Add to Cart</motion.button>
              
            </div>

          </div>
        </div>
      );
    }

export default Modal;
