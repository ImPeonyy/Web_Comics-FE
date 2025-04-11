import { createContext, useEffect, useState } from 'react';

import { filterComic } from '@services/ComicService';
import { useSearchParams } from 'react-router-dom';

export const FilterComicsContext = createContext();

const sortOptions = [
    { value: 'default', label: 'Mặc định' },
    { value: 'updated_at', label: 'Mới cập nhật' },
    { value: 'created_at', label: 'Ngày phát hành' },
    { value: 'views', label: 'Xem nhiều nhất' },
    { value: 'name', label: 'Tên A-Z' }
];

const statusOptions = [
    { value: 'default', label: 'Tất cả' },
    { value: 'Ongoing', label: 'Đang tiến hành' },
    { value: 'Completed', label: 'Đã hoàn thành' }
];

export const FilterComicsProvider = ({ children }) => {
    const [comics, setComics] = useState([]);
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    const fetchComics = async () => {
        setIsLoading(true);
        const keyword = searchParams.get('keyword');
        const sortBy = searchParams.get('sortBy');
        const status = searchParams.get('status');
        const genres = searchParams.get('genres');

        // Kiểm tra xem có tham số nào không
        const hasParams =
            keyword ||
            (sortBy && sortBy !== 'default') ||
            (status && status !== 'default') ||
            genres;

        if (!hasParams) {
            // Nếu không có tham số nào, lấy tất cả truyện
            const res = await filterComic({});
            setComics(res.data.data);
            setIsLoading(false);
            return;
        }

        const params = {};

        if (keyword) {
            params.keyword = keyword;
        }

        if (sortBy && sortBy !== 'default') {
            params.sortBy = sortBy;
        }

        if (status && status !== 'default') {
            params.status = status;
        }

        if (genres) {
            params.genres = genres.split(',');
        }

        filterComic(params)
            .then((res) => {
                setComics(res.data.data);
            })
            .catch((err) => {
                setComics([]);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchComics();
    }, [searchParams]);

    return (
        <FilterComicsContext.Provider
            value={{
                comics,
                searchParams,
                fetchComics,
                sortOptions,
                statusOptions,
                isLoading
            }}
        >
            {children}
        </FilterComicsContext.Provider>
    );
};
