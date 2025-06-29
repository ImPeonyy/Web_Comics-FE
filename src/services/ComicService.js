import axiosClient from '@services/axiosClient';

const getAllComics = async (page = 1) => {
    return await axiosClient.get(`/comics`, {
        params: {
            page,
            per_page: 12
        }
    });
};

const getComicById = async (comicId) => {
    return await axiosClient.get(`/comics/${comicId}`);
};

const getChapterList = async (comicId) => {
    return await axiosClient.get(`/chapters/comic/${comicId}`);
};

const getChapterImages = async (chapterId) => {
    return await axiosClient.get(`/images/chapter/${chapterId}`);
};

const getCmtByComicId = async (comicId) => {
    return await axiosClient.get(`comments/comic/${comicId}`);
};

const postComment = async (comicId, content) => {
    return await axiosClient.post('/comments/post', {
        comic_id: comicId,
        content
    });
};

const getGenres = async () => {
    return await axiosClient.get(`/genres`);
};

const filterComic = async (params) => {
    return await axiosClient.get('/comics/filter', {
        params: {
            keyword: params.keyword,
            genres: params.genres?.join(','),
            status: params.status,
            sortBy: params.sortBy,
            direction: params.direction,
            page: params.page,
            per_page: 12
        }
    });
};

const getRandomComic = async () => {
    return await axiosClient.get('/comics/random');
};

const searchComics = async (keyword) => {
    return await axiosClient.get('/comics/search', {
        params: {
            keyword
        }
    });
};

const getAllComicsByAdmin = async () => {
    return await axiosClient.get('/admin/all-comics');
};

const updateComic = async (comicId, comic) => {
    return await axiosClient.put(`/admin/update-comic/${comicId}`, comic);
};

const deleteComic = async (comicId) => {
    return await axiosClient.delete(`/admin/delete-comic/${comicId}`);
};

export {
    getAllComics,
    getComicById,
    getGenres,
    getChapterList,
    getChapterImages,
    getCmtByComicId,
    postComment,
    filterComic,
    getRandomComic,
    searchComics,
    getAllComicsByAdmin,
    updateComic,
    deleteComic
};
