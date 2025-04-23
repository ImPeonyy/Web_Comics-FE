import { createContext, useEffect, useState } from 'react';
import { getHomePageFav, getHomePageHistory } from '@services/FavHisService';
import {
    getTopComicsByDay,
    getTopComicsByMonth,
    getTopComicsByWeek
} from '@services/StatisticService';

import Cookies from 'js-cookie';
import { getAllComics } from '@services/ComicService';
import { useParams } from 'react-router-dom';

export const HomePageContext = createContext();

const features = [
    { title: 'Truyện Yêu Thích', href: '/favorites?page=1' },
    { title: 'Lịch Sử', href: '/history?page=1' }
];

const statistic = [
    { title: 'Top Tháng' },
    { title: 'Top Tuần' },
    { title: 'Top Ngày' }
];

export const HomePageProvider = ({ children }) => {
    const [recommendComics, setRecommendComics] = useState([]);
    const [favoriteComics, setFavoriteComics] = useState([]);
    const [allComics, setAllComics] = useState([]);
    const [isAllComicsLoading, setIsAllComicsLoading] = useState(false);
    const [isFavLoading, setIsFavLoading] = useState(false);
    const [historyComics, setHistoryComics] = useState([]);
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);
    const [topComicsByMonth, setTopComicsByMonth] = useState([]);
    const [topComicsByWeek, setTopComicsByWeek] = useState([]);
    const [topComicsByDay, setTopComicsByDay] = useState([]);
    const [isTopComicsLoading, setIsTopComicsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: 0,
        to: 0
    });

    const isAuthenticated = !!Cookies.get('token');

    useEffect(() => {
        getTopComicsByMonth()
            .then((res) => {
                const data = res.data.data;
                setRecommendComics(data);
            })
            .catch((err) => {
                console.log('API error:', err);
            });
    }, []);

    const fetchTopComicsByMonth = () => {
        setIsTopComicsLoading(true);
        getTopComicsByMonth()
            .then((res) => {
                const data = res.data.data;
                setTopComicsByMonth(data);
            })
            .catch((err) => {
                console.log('API error:', err);
            })
            .finally(() => {
                setIsTopComicsLoading(false);
            });
    };

    const fetchTopComicsByWeek = () => {
        setIsTopComicsLoading(true);
        getTopComicsByWeek()
            .then((res) => {
                const data = res.data.data;
                setTopComicsByWeek(data);
            })
            .catch((err) => {
                console.log('API error:', err);
            })
            .finally(() => {
                setIsTopComicsLoading(false);
            });
    };

    const fetchTopComicsByDay = () => {
        setIsTopComicsLoading(true);
        getTopComicsByDay()
            .then((res) => {
                const data = res.data.data;
                setTopComicsByDay(data);
            })
            .catch((err) => {
                console.log('API error:', err);
            })
            .finally(() => {
                setIsTopComicsLoading(false);
            });
    };

    useEffect(() => {
        fetchTopComicsByMonth();
        fetchTopComicsByWeek();
        fetchTopComicsByDay();
    }, []);

    const { page } = useParams();

    const fetchAllComics = (newPage = 1) => {
        setIsAllComicsLoading(true);
        getAllComics(newPage)
            .then((res) => {
                setPagination(res.data.pagination);
                setAllComics(res.data.data);
            })
            .catch((err) => {
                console.log('API error:', err);
            })
            .finally(() => {
                setIsAllComicsLoading(false);
            });
    };

    useEffect(() => {
        const currentPage = page ? parseInt(page) : 1;
        fetchAllComics(currentPage);
    }, [page]);

    const fetchFavoriteComics = () => {
        setIsFavLoading(true);
        getHomePageFav()
            .then((res) => {
                const data = res.data.data.slice(0, 6);
                setFavoriteComics(data);
            })
            .catch((err) => {
                console.log('API error:', err);
            })
            .finally(() => {
                setIsFavLoading(false);
            });
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchFavoriteComics();
        }
    }, [isAuthenticated]);

    const fetchHistoryComics = () => {
        if (isAuthenticated) {
            setIsHistoryLoading(true);
            getHomePageHistory()
                .then((res) => {
                    const data = res.data.data.slice(0, 6);
                    setHistoryComics(data);
                })
                .catch((err) => {
                    console.log('API error:', err);
                })
                .finally(() => {
                    setIsHistoryLoading(false);
                });
        }
    };

    useEffect(() => {
        fetchHistoryComics();
    }, [isAuthenticated]);

    const values = {
        recommendComics,
        favoriteComics,
        allComics,
        isAllComicsLoading,
        isFavLoading,
        historyComics,
        isHistoryLoading,
        features,
        statistic,
        topComicsByMonth,
        topComicsByWeek,
        topComicsByDay,
        isTopComicsLoading,
        fetchTopComicsByMonth,
        fetchTopComicsByWeek,
        fetchTopComicsByDay,
        pagination,
        fetchAllComics
    };

    return (
        <HomePageContext.Provider value={values}>
            {children}
        </HomePageContext.Provider>
    );
};
