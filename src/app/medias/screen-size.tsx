import { useEffect } from 'react';
import { useState } from 'react';
import { WindowSize } from '../shared/interface';

export function getWindowDimensions(): WindowSize {
    const { innerWidth, innerHeight } = window;
    return {
        innerWidth,
        innerHeight,
    };
}
export function useScreenSize() {
    const [screenSize, setScreenSize] = useState<WindowSize | undefined>(
        undefined
    );

    useEffect(() => {
        function handleResize() {
            setScreenSize(getWindowDimensions());
        }

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return screenSize;
}
