import { createContext, useEffect, useState } from 'react';

import { calcView } from '@utils/commonUtils';
import { getHistoryList } from '@services/FavHisService';
import { useParams } from 'react-router-dom';

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
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
        getHistoryList(newPage)
            .then((res) => {
                const data = res.data.data.data;
                data.forEach((item) => {
                    item.comic.view = calcView(item.comic.statistics);

                    item.comic.isFavorite =
                        item.comic.favorites && item.comic.favorites.length > 0;
                });
                setComics(data);
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
        <HistoryContext.Provider value={{ comics, pagination, fetchComics }}>
            {children}
        </HistoryContext.Provider>
    );
};
