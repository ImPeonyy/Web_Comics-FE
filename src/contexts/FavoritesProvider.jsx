import { createContext, useEffect, useState } from 'react';

import { calcView } from '@utils/commonUtils';
import { getFavList } from '@services/FavHisService';
import { useParams } from 'react-router-dom';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [comics, setComics] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: 0,
        to: 0
    });

    const { page } = useParams();

    const fetchComics = (newPage = 1) => {
        getFavList(newPage)
            .then((res) => {
                const comicArray = res.data.data.map((item) => item.comic);
                comicArray.forEach((item) => {
                    item.view = calcView(item.statistics);

                    item.isFavorite =
                        item.favorites && item.favorites.length > 0;
                });
                setComics(comicArray);
                setPagination(res.data.pagination);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        const currentPage = page ? parseInt(page) : 1;
        fetchComics(currentPage);
    }, [page]);

    return (
        <FavoritesContext.Provider value={{ comics, pagination, fetchComics }}>
            {children}
        </FavoritesContext.Provider>
    );
};
