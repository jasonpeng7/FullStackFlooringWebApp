// Carousel.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Carousel = () => {
  const colors = ['#D4D4D4', '#C4C4C4', '#B4B4B4', '#A4A4A4', '#939393'];


  const numberOfSquares = colors.length; 
  const squares = new Array(numberOfSquares).fill(0);

  return (
    <div className="overflow-hidden w-full h-64 relative">
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{ x: `-${30 * numberOfSquares}%` }} 
        transition={{
          duration: 9,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop'}}>

        {[...squares, ...squares, ...squares].map((_, index) => (
          <motion.div
            key={index}
            className="relative w-96 h-96 flex-shrink-0"
            style={{
              backgroundColor: colors[index % colors.length],
              marginRight: '10px', 
            }}
          >
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Carousel;
