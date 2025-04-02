import { createContext, useEffect, useState } from 'react';

import { getAllComic } from '@services/ComicService';

export const HomePageContext = createContext();

export const HomePageProvider = ({ children }) => {
    const [recommendComics, setRecommendComics] = useState([]);
    const [popularComics, setPopularComics] = useState([]);

    useEffect(() => {
        getAllComic()
            .then((res) => {
                setRecommendComics(res.data.data);
            })
            .catch((err) => {
                console.log('API error:', err);
            });
    }, []);

    const values = { recommendComics, popularComics };

    return (
        <HomePageContext.Provider value={ values }>
            {children}
        </HomePageContext.Provider>
    );
};
