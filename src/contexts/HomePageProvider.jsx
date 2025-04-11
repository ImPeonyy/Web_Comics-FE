import { createContext, useEffect, useState } from 'react';

import { calcView } from '@utils/commonUtils';
import { getAllComic } from '@services/ComicService';

export const HomePageContext = createContext();

export const HomePageProvider = ({ children }) => {
    const [recommendComics, setRecommendComics] = useState([]);
    const [popularComics, setPopularComics] = useState([]);

    useEffect(() => {
        getAllComic()
            .then((res) => {
                const data = res.data.data;
                data.forEach((item) => {
                    item.view = calcView(item.statistics);

                    item.isFavorite =
                        item.favorites && item.favorites.length > 0;
                });
                setRecommendComics(data);
            })
            .catch((err) => {
                console.log('API error:', err);
            });
    }, []);

    const values = { recommendComics, popularComics };

    return (
        <HomePageContext.Provider value={values}>
            {children}
        </HomePageContext.Provider>
    );
};
