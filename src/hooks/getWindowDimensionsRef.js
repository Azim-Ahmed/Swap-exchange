import { useState, useEffect } from 'react';

function getWindowDimensionsOfRef(ref) {
    if(ref.current){
        const boundingRect = ref?.current.getBoundingClientRect()
        const { width, height } = boundingRect
        return {
            width,
            height
        }
    }
    
}


export default function useWindowDimensionsRef(ref) {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensionsOfRef(ref));

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensionsOfRef(ref));
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [ref]);

    return windowDimensions;
}
