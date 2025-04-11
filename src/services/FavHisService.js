import axiosClient from '@services/axiosClient';

const getFavList = async () => {
    return await axiosClient.get('/favorites/my-favorites');
};

const addFav = async (comicId) => {
    return await axiosClient.post(`/favorites/add/${comicId}`);
};

const removeFav = async (comicId) => {
    return await axiosClient.delete(`/favorites/remove/${comicId}`);
};

const getHistoryList = async () => {
    return await axiosClient.get('/history/my-history');
};

const addHistory = async (comicId) => {
    return await axiosClient.post(`history/add/${comicId}`);
};

const removeHistory = async (comicId) => {
    return await axiosClient.delete(`/history/remove/${comicId}`);
};

export {
    getFavList,
    getHistoryList,
    addFav,
    removeFav,
    addHistory,
    removeHistory
};
