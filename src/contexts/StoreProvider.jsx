import { createContext, useContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { ToastContext } from '@/contexts/ToastProvider';
import { getGenres } from '@services/ComicService';
import { getMyInfo } from '@services/UserService';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [myInfo, setMyInfo] = useState(null);
    const [genres, setGenres] = useState([]);

    const userID = Cookies.get('userID');
    const { toast } = useContext(ToastContext);

    useEffect(() => {
        if (userID) {
            getMyInfo(userID)
                .then((res) => {
                    setMyInfo(res.data);
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        }
        getGenres()
            .then((res) => {
                setGenres(res.data.data);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }, [userID]);

    return (
        <StoreContext.Provider value={{ myInfo, genres }}>
            {children}
        </StoreContext.Provider>
    );
};
