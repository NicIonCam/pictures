import React, { ReactNode, useEffect, useState } from 'react';

export const MediaQueryContext = React.createContext({});

export const MediaQueryContextProvider: React.FC<{children: ReactNode}> = ({ children }: { children: ReactNode }) => {
    const [mediaQuery, setMedia] = useState({
        isSmall: false,
        isMedium: false,
        isLarge: false,
    })

    const MediaEventHandler = () => {
        if(window.matchMedia(`(max-width: ${748}px)`).matches) {
            setMedia({
                isSmall: true,
                isMedium: false,
                isLarge: false,
            })
            return;
        }
        if(window.matchMedia(`(max-width: ${1400}px)`).matches) {
            setMedia({
                isSmall: false,
                isMedium: true,
                isLarge: false,
            })
            return;
        }

        if(window.matchMedia(`(min-width: ${1401}px)`).matches) {
            setMedia({
                isSmall: false,
                isMedium: false,
                isLarge: true,
            })
            return;
        }
        setMedia({
            isSmall: false,
            isMedium: true,
            isLarge: false,
        })
    }

    useEffect(() => {
        MediaEventHandler();
        window.addEventListener('load', MediaEventHandler);
        window.addEventListener('resize', MediaEventHandler)
        return () => {
            window.removeEventListener('load', MediaEventHandler);
            window.removeEventListener('resize', MediaEventHandler);
        }
    }, [])

    return (
        <MediaQueryContext.Provider value={{
            mediaQuery,
        }}>
            {children}
        </MediaQueryContext.Provider>
    )
}