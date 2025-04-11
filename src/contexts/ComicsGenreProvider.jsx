import { createContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deslugify } from '@utils/slugifyUtils';
import { getComicsByGenre } from '@services/ComicService';

export const ComicsGenreContext = createContext();

export const ComicsGenreProvider = ({ children }) => {
    const [comics, setComics] = useState([]);
    const [genre, setGenre] = useState('');
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: 0,
        to: 0
    });

    const { genreSlug, page } = useParams();
    const navigate = useNavigate();

    const fetchComics = (newPage = 1) => {
        const genreId = deslugify(genreSlug);
        getComicsByGenre(genreId, newPage)
            .then((res) => {
                const comicArray = res.data.data.map((item) => item.comic);
                setComics(comicArray);
                setGenre(res.data.genre);
                setPagination(res.data.pagination);
                navigate(`/genre/${genreSlug}?page=${newPage}`, {
                    replace: true
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        const currentPage = page ? parseInt(page) : 1;
        fetchComics(currentPage);
    }, [genreSlug, page]);

    return (
        <ComicsGenreContext.Provider
            value={{ comics, genre, pagination, fetchComics }}
        >
            {children}
        </ComicsGenreContext.Provider>
    );
};
