import axiosClient from '@services/axiosClient';

const getAllComic = async () => {
    return await axiosClient.get(`/comics`);
};

const getGenres = async () => {
    return await axiosClient.get(`/genres`);
};

export { getAllComic, getGenres };
