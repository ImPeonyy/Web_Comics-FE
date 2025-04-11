import { createContext, useEffect, useState } from 'react';
import {
    getChapterList,
    getCmtByComicId,
    getRandomComic,
    postComment
} from '@services/ComicService';

import { calcView } from '@utils/commonUtils';

export const ComicDetailContext = createContext();

export const ComicDetailProvider = ({ children }) => {
    const [isComicDetailOpen, setIsComicDetailOpen] = useState(false);
    const [chapterList, setChapterList] = useState([]);
    const [comicDetail, setComicDetail] = useState(null);
    const [commentList, setCommentList] = useState([]);
    const [cmtCount, setCmtCount] = useState(0);

    const fetchCommentList = async () => {
        if (!comicDetail) return;

        try {
            const res = await getCmtByComicId(comicDetail.id);
            const data = res.data.data;
            setCommentList(data.comments);
            setCmtCount(data.total_comments);
        } catch (err) {
            console.log(err);
        }
    };

    const sendComment = async (content) => {
        if (!comicDetail) return;

        try {
            await postComment(comicDetail.id, content);
            await fetchCommentList(); // Refresh lại danh sách comment sau khi gửi
        } catch (err) {
            console.log(err);
        }
    };

    const handleRandomComic = async () => {
        getRandomComic()
            .then((res) => {
                const data = res.data.data;

                data.view = calcView(data.statistics);

                data.isFavorite = data.favorites && data.favorites.length > 0;

                setComicDetail(data);
                setIsComicDetailOpen(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (!comicDetail) return;

        getChapterList(comicDetail.id)
            .then((res) => {
                setChapterList([...res.data].reverse());
            })
            .catch((err) => {
                console.log(err);
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
                handleRandomComic
            }}
        >
            {children}
        </ComicDetailContext.Provider>
    );
};
