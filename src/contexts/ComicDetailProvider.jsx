import { createContext, useEffect, useState } from 'react';
import {
    getChapterList,
    getCmtByComicId,
    getRandomComic,
    postComment
} from '@services/ComicService';

export const ComicDetailContext = createContext();

export const ComicDetailProvider = ({ children }) => {
    const [isComicDetailOpen, setIsComicDetailOpen] = useState(false);
    const [chapterList, setChapterList] = useState([]);
    const [comicDetail, setComicDetail] = useState(null);
    const [commentList, setCommentList] = useState([]);
    const [cmtCount, setCmtCount] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isRandomComicLoading, setIsRandomComicLoading] = useState(false);
    const [isChaptersLoading, setIsChaptersLoading] = useState(false);
    const [isCommentsLoading, setIsCommentsLoading] = useState(false);

    useEffect(() => {
        if (comicDetail) {
            setIsFavorite(comicDetail.isFav);
        }
    }, [comicDetail]);

    const fetchCommentList = () => {
        if (!comicDetail) return;

        setIsCommentsLoading(true);

        getCmtByComicId(comicDetail.id)
            .then((res) => {
                const data = res.data.data;
                setCommentList(data.comments);
                setCmtCount(data.total_comments);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsCommentsLoading(false);
            });
    };

    const sendComment = (content) => {
        if (!comicDetail) return;

        postComment(comicDetail.id, content)
            .then(() => {
                fetchCommentList();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleRandomComic = () => {
        setIsRandomComicLoading(true);
        getRandomComic()
            .then((res) => {
                const data = res.data.data;
                setComicDetail(data);
                setIsComicDetailOpen(true);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsRandomComicLoading(false);
            });
    };

    useEffect(() => {
        if (!comicDetail) return;

        setIsChaptersLoading(true);
        getChapterList(comicDetail.id)
            .then((res) => {
                setChapterList([...res.data].reverse());
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsChaptersLoading(false);
            });
    }, [comicDetail]);

    useEffect(() => {
        fetchCommentList();
    }, [comicDetail]);

    return (
        <ComicDetailContext.Provider
            value={{
                isComicDetailOpen,
                setIsComicDetailOpen,
                comicDetail,
                setComicDetail,
                chapterList,
                commentList,
                cmtCount,
                fetchCommentList,
                sendComment,
                handleRandomComic,
                isChaptersLoading,
                isCommentsLoading,
                isFavorite,
                setIsFavorite,
                isRandomComicLoading
            }}
        >
            {children}
        </ComicDetailContext.Provider>
    );
};
