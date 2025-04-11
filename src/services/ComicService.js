import axiosClient from '@services/axiosClient';

const getAllComic = async (page = 1) => {
    return await axiosClient.get(`/comics`, {
        params: {
            page,
            per_page: 10
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

const getComicsByGenre = async (genreId, page = 1) => {
    return await axiosClient.get(`/comics-genres/${genreId}`, {
        params: {
            page,
            per_page: 10
        }
    });
};

const filterComic = async (params) => {
    return await axiosClient.get('/comics/filter', {
        params: {
            keyword: params.keyword,
            genres: params.genres?.join(','),
            status: params.status,
            sortBy: params.sortBy,
            direction: params.direction
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

export {
    getAllComic,
    getComicById,
    getGenres,
    getChapterList,
    getChapterImages,
    getCmtByComicId,
    getComicsByGenre,
    postComment,
    filterComic,
    getRandomComic,
    searchComics
};
