import React from 'react';
import {motion} from 'framer-motion';

const FillerBackground = () => {
    return (
        <motion.div
            className="min-h-screen flex-grow w-2/5 flex items-center justify-end bg-customBone4 opacity-50 shadow-2xl pt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 1.5 }}>
        </motion.div>    
    )
}

export default FillerBackground;