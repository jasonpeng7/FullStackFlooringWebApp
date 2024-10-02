import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

function TypewriterComponent() {
  const [text] = useTypewriter({
    words: ['Premium Flooring for Every Lifestyle!', 'Innovation and Comfort in Every Plank.', 'Crafted to Last.', 'Step into Style, One Floor at a Time.' ],
    loop: {},
    typeSpeed: 70,
    delaySpeed: 1500,
    deleteSpeed: 35,
  });

  return (
    <h1 className="text-6xl text-left tenor-sans-regular text-customBone3">
    <span className="">
      {text}
    </span>
    <Cursor />
  </h1>
  );
}

export default TypewriterComponent;
