import {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";
import './index.css';
import Modal from './modalCOMPONENT.jsx';
import Carousel from './carousel.jsx';
import SVGcomponent from './linesvgCOMPONENT.jsx';
import NavBar from './navbarCOMPONENT.jsx';
import TypewriterComponent from './typewriterCOMPONENT.jsx';
import {motion} from "framer-motion";
import {useAnimation} from "framer-motion";
import {useInView} from "react-intersection-observer";
import CartComponent from './cartCOMPONENT.jsx';
import FillerBackground from './filler-backgroundCOMPONENT.jsx';
import AnimatedCatchphrase from './intro-catchphraseCOMPONENT.jsx';

function App() {
  const [flooringOptions, setFlooringOptions] = useState([]); //flooring options stored in an array
  const [cartOpen, setCartOpen] = useState(false);  // cart modal closed on initial render
  const [errorMessage, setErrorMessage] = useState(''); // error message none on initial render
  const [displayDetails, setDisplayDetails] = useState(null); //modal initially invisible

  //update function to display or hide "view details" modal
  const openModal = (floor) => {
    setDisplayDetails(floor);
  };
  const closeModal = () => {
    setDisplayDetails(null);
  };

  const floorCategory = [
    "Engineered Wood.",
    "Exotic Wood.",
  ];

  //async allows use for await
  const fetchFlooring = async () => {
    try {
      const response = await axios.get("http://localhost:8080/flooring");
      setFlooringOptions(response.data.flooring);
    } catch (error) {
      console.error("Error fetching flooring options", error);
    }
  };

  //after initial render, start to fetch data from backend
  useEffect(() => {
    fetchFlooring();
  }, []);

  const addToCart = async (floorItem) => {
    try {
      const response = await axios.post("http://localhost:8080/cart", { item: floorItem });
      console.log(response.data.message);
      setErrorMessage(''); 
    } catch (error) {
      setErrorMessage("Failed to add item to cart. Please try again.");
    }
  };

   // update cart to be visible on click
  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };



  //categorize flooring by material
  const groupedOptions = [
    flooringOptions.filter(floor => [1, 2, 5].includes(floor.id)),
    flooringOptions.filter(floor => [3, 6, 7].includes(floor.id)),
    flooringOptions.filter(floor => [4, 8].includes(floor.id)),
  ];

  //animation for carousel container
  const { ref } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  //general animations
  const controls = useAnimation();

    // Start animation immediately when carousel is rendered
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <>
      {/* ------------Navigation bar UI */}
      <NavBar toggleCart={toggleCart} />

      {/* ------------carousel container */}
      <motion.div 
        ref={ref} 
        initial={{ opacity: 0 }} 
        animate={controls} 
        className="bg-stone900 flex justify-center h-96 w-full" 
        variants={{
          hidden: {
            opacity: 0,
            rotateY: -90, 
            scale: 0.8,
            transition: { duration: 0 }  // Set duration to 0 for hidden state
          },
          visible: {
            opacity: 1,
            rotateY: 0,
            scale: 1,     
            transition: {
              duration: 1,
              ease: "easeInOut", 
            },
          },
          }}
          style= {{ perspective: 1000}}>
          <div className='w-full mt-20 relative'>
            <div className='absolute top-0 right-0 flex flex-row items -mt-14'></div>
            <Carousel/>
          </div>
      </motion.div>

      {/* ------------cart UI */}
      <CartComponent cartOpen={cartOpen} toggleCart={() => setCartOpen(!cartOpen)} />
      
      <div className="flex h-full mt-5 mb-5">
        <div className="flex-grow flex-col w-3/5 flex justify-start bg-inherit pt-20 pb-20 mr-10">
          <AnimatedCatchphrase />
          <div className="border-t border-customBone2 mb-10 w-36"></div>
            {/* typewriter text animation */}
            <TypewriterComponent />
          </div>
      
        {/* ------------background for aesthetic and blank space filler */}
        <FillerBackground />
      </div>
      
      {/* ------------parallax background 1 */}
      <div className="tenor-sans-regular flex items-center justify-center min-h-screen bg-fixed bg-parallax2 bg-cover relative shadow-2xl">
        <div className='flex flex-col items-center justify-center'>
          <h1 className="bg-gradient-to-r from-slate50 via-slate900 to-slate950 bg-clip-text text-transparent text-6xl p-5">Transform Your Home.</h1>
          <h1 className='bg-gradient-to-r from-slate50 via-slate900 to-slate950 bg-clip-text text-transparent text-6xl p-5'>Start Shopping Now.</h1>
        </div>
      </div>
      
      {/* ------------category 1: basic options */}
      <motion.div
        ref={ref}
        className="bg-transparent flex justify-end min-h-20 w-fill relative mb-10 mt-20"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 2.5 } },}}>
        <p className="text-black text-6xl p-5 text-right raleway">Basic Options.</p>
      </motion.div>

      {/* ------------horizontal line divider */}
      <div className='flex justify-end text-right mb-48 relative'>
        <SVGcomponent width={100} height={100} />
      </div>

      {/* ------------Modal  UI */}
      <Modal item={displayDetails} Close={closeModal} addToCart={addToCart}></Modal>

      {/* ------------Display each flooring item, in respective, categorized, rows */}
      {groupedOptions.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap justify-left mt-0 space-x-12 mb-48">
          {row.map((floor, index) => (
            <div key={index} className="w-1/3 p-4 flex-shrink-0 max-w-xs relative group">
              <div className="relative w-full h-auto">
                <img src={floor.imageURL} alt={`Vinyl Flooring ${index + 1}`} className="w-full h-auto" />
                <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => openModal(floor)} className="bg-inherit text-white py-2 px-4 rounded">View Details</button>
                </div>
              </div>

              <div className="text-left mt-4 text-black manjari-thin">
                <p className='text-xl'>{floor.type}</p>
                <div className='border-t border-black my-3 w-16'></div>
                <motion.button className="hover:bg-green-400 bg-stone950 text-white pt-2 pb-1 px-4 rounded mt-2" onClick={() => addToCart(floor)} whileTap={{ scale: 0.85 }}>Add to Cart</motion.button>
              </div>
            </div>
          ))}

          {/* ------------manually add in last two category names with respective line divider and animation*/}
          {rowIndex < groupedOptions.length - 1 && (
            <motion.div
              className="bg-transparent flex flex-col justify-end min-h-20 w-full relative mb-10"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <p className="text-black text-6xl p-5 text-right mb-10 raleway">{floorCategory[rowIndex]}</p>
              <div className='flex justify-end mb-38'>
                <SVGcomponent width={100} height={2} /> 
              </div>
            </motion.div>
          )}
        </div>
      ))}

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      
      {/* ------------parallax background 2 */}
      <div className="tenor-sans-regular flex items-center justify-center h-96 bg-fixed bg-parallax bg-cover relative shadow-2xl">
        <h1 className="text-white text-6xl">Flooring Solutions Tailored to Your Unique Vision.</h1>
      </div>
      
      {/* ------------filler container */}
      <div className="flex items-center justify-center min-h-56 =w-full bg-stone900 mt-20 relative">
        <h1 className="text-white"></h1>
      </div>

    </>
  );
}

export default App;
