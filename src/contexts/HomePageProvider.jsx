import { createContext, useEffect, useState } from 'react';
import { getHomePageFav, getHomePageHistory } from '@services/FavHisService';
import {
    getTopComicsByDay,
    getTopComicsByMonth,
    getTopComicsByWeek
} from '@services/StatisticService';

import Cookies from 'js-cookie';
import { getAllComic } from '@services/ComicService';

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
    const [isFavLoading, setIsFavLoading] = useState(false);
    const [historyComics, setHistoryComics] = useState([]);
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);
    const [topComicsByMonth, setTopComicsByMonth] = useState([]);
    const [topComicsByWeek, setTopComicsByWeek] = useState([]);
    const [topComicsByDay, setTopComicsByDay] = useState([]);
    const [isTopComicsLoading, setIsTopComicsLoading] = useState(false);

    const isAuthenticated = !!Cookies.get('token');

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

    useEffect(() => {
        getAllComic()
            .then((res) => {
                const data = res.data.data;
                setRecommendComics(data);
            })
            .catch((err) => {
                console.log('API error:', err);
            });
    }, []);

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
        fetchTopComicsByDay
    };

    return (
        <HomePageContext.Provider value={values}>
            {children}
        </HomePageContext.Provider>
    );
};
