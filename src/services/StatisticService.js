import axiosClient from './axiosClient';

const getRecommendComics = async () => {
    return await axiosClient.get('/statistics/recommend');
};

const getTopComicsByMonth = async () => {
    return await axiosClient.get('/statistics/top/month');
};

const getTopComicsByWeek = async () => {
    return await axiosClient.get('/statistics/top/week');
};

const getTopComicsByDay = async () => {
    return await axiosClient.get('/statistics/top/day');
};

const increaseView = async (comicId) => {
    return await axiosClient.post(`/statistics/increase-view/${comicId}`);
};

export {
    getRecommendComics,
    getTopComicsByMonth,
    getTopComicsByWeek,
    getTopComicsByDay,
    increaseView
};
