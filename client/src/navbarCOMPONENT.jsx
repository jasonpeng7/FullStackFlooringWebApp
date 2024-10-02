import React from 'react';
import CartSVG from './cartsvgCOMPONENT.jsx';
import LineSVG from './linesvgCOMPONENT.jsx';
import {motion} from 'framer-motion';

const navBar = ({toggleCart}) => {
    return(
        <motion.nav className="fixed opacity-75 top-4 right-4 bg-inherit rounded-sm text-white p-4 flex items-center justify-center shadow-2xl z-50 m-4"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: 'easeInOut', delay: 1 }}>

            <div className="bg-transparent w-fit ml-5 ">
                <LineSVG />
            </div>
            <button onClick={toggleCart}className="bg-black hover:bg-slate-400 mr-5">
                <CartSVG /> {/* Insert the CartSVG here */}
            </button>
        </motion.nav>
    );
}

export default navBar;