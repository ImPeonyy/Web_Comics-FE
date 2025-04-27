import { createContext, useContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { ToastContext } from '@/contexts/ToastProvider';
import { getChaptersHistory } from '@services/FavHisService';
import { getGenres } from '@services/ComicService';
import { getMyInfo } from '@services/UserService';

const dataMenu = [
    { id: 22, title: 'Manga' },
    { id: 23, title: 'Manhwa' },
    { id: 24, title: 'Manhua' },
    { id: 28, title: 'Ngôn tình' }
];

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [myInfo, setMyInfo] = useState(null);
    const [genres, setGenres] = useState([]);
    const [chaptersHistory, setChaptersHistory] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fetchChaptersHistory = () => {
        getChaptersHistory()
            .then((res) => {
                setChaptersHistory(res.data.history);
            })
            .catch((err) => {
                toast.error(err);
            });
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchChaptersHistory();
        }
    }, [isAuthenticated]);

    const chapterStatus = (chapter) => {
        const chapterHistory = chaptersHistory.find(
            (item) => item.chapter_id === chapter.id
        );
        return chapterHistory ? true : false;
    };

    const userID = Cookies.get('userID');
    const { toast } = useContext(ToastContext);

    const fetchMyInfo = () => {
        if (userID) {
            getMyInfo(userID)
                .then((res) => {
                    setMyInfo(res.data);
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        }
    };

    useEffect(() => {
        fetchMyInfo();
        getGenres()
            .then((res) => {
                setGenres(res.data.data);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }, [userID]);

    return (
        <StoreContext.Provider
            value={{
                myInfo,
                setMyInfo,
                genres,
                fetchMyInfo,
                dataMenu,
                chaptersHistory,
                fetchChaptersHistory,
                chapterStatus,
                isAuthenticated,
                setIsAuthenticated
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};
