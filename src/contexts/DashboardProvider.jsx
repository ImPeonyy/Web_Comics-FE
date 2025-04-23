import { createContext, useEffect, useState } from 'react';

import { getAllComicsByAdmin } from '@services/ComicService';
import { getAllUsers } from '@services/UserService';
import { getGenres } from '@services/ComicService';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [allComics, setAllComics] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getGenres()
            .then((res) => {
                setGenres(res.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const fetchAllUsers = () => {
        getAllUsers()
            .then((res) => {
                setAllUsers(res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllComics = () => {
        getAllComicsByAdmin()
            .then((res) => {
                setAllComics(res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchAllComics();
    }, []);

    return (
        <DashboardContext.Provider
            value={{
                allUsers,
                allComics,
                genres,
                fetchAllUsers,
                fetchAllComics
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};
