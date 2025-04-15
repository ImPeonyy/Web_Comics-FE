import axiosClient from './axiosClient';

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
    getTopComicsByMonth,
    getTopComicsByWeek,
    getTopComicsByDay,
    increaseView
};
