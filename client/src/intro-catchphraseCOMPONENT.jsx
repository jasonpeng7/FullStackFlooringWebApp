import {motion} from 'framer-motion';
import { useEffect, useState } from 'react';



const sentence = ['Your', 'Flooring', 'Options', 'Start', 'Here'];

const AnimatedCatchphrase = () => {
    const [initialDelay, setinitialDelay] = useState(false);

    useEffect(() => {
        const delay = setTimeout(() => {
            setinitialDelay(true);
        }, 2500 );
        return () => clearTimeout(delay);
    }, [])

    return (
        <div className="text-6xl text-left tenor-sans-regular mb-10 text-black">
            {sentence.map((word, index) => (
                <motion.span key={index} className="inline-block mr-5 mb-5" 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: initialDelay ? 1 : 0, y: initialDelay ? 0 : -50,}}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.4}}>
                    {word}
                </motion.span>
            )
            )}
        </div>
    );
}
export default AnimatedCatchphrase;