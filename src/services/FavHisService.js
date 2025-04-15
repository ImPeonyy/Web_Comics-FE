import axiosClient from '@services/axiosClient';

const getFavList = async (page = 1) => {
    return await axiosClient.get(`/favorites/my-favorites`, {
        params: {
            page,
            per_page: 10
        }
    });
};

const getHomePageFav = async () => {
    return await axiosClient.get('/favorites/home-page');
};

const addFav = async (comicId) => {
    return await axiosClient.post(`/favorites/add/${comicId}`);
};

const removeFav = async (comicId) => {
    return await axiosClient.delete(`/favorites/remove/${comicId}`);
};

const getHistoryList = async (page = 1) => {
    return await axiosClient.get('/history/my-history', {
        params: {
            page,
            per_page: 10
        }
    });
};

const addHistory = async (comicId, chapterId) => {
    return await axiosClient.post(`history/add`, {
        comic_id: comicId,
        chapter_id: chapterId
    });
};

const removeHistory = async (comicId, chapterId) => {
    return await axiosClient.delete(`history/remove`, {
        comic_id: comicId,
        chapter_id: chapterId
    });
};

const getHomePageHistory = async () => {
    return await axiosClient.get('/history/home-page');
};

const getChaptersHistory = async () => {
    return await axiosClient.get('/history/chapters');
};

export {
    getFavList,
    getHistoryList,
    addFav,
    removeFav,
    addHistory,
    removeHistory,
    getChaptersHistory,
    getHomePageFav,
    getHomePageHistory
};
