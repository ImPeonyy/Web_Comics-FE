import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { useContext, useEffect, useRef, useState } from 'react';

import { ComicDetailContext } from '@contexts/ComicDetailProvider';
import { StoreContext } from '@contexts/StoreProvider';
import dayjs from 'dayjs';
import { slugify } from '@utils/slugifyUtils';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';

const Comic = ({
    titleStyle,
    chapterStyle,
    comic,
    onDelete,
    isLoading,
    historyChapter
}) => {
    const { setComicDetail, setIsComicDetailOpen } =
        useContext(ComicDetailContext);
    const { chapterStatus } = useContext(StoreContext);
    const [isSmallWidth, setIsSmallWidth] = useState(false);
    const comicRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const checkWidth = () => {
            if (comicRef.current) {
                setIsSmallWidth(comicRef.current.offsetWidth < 185);
            }
        };

        checkWidth();
        window.addEventListener('resize', checkWidth);

        return () => {
            window.removeEventListener('resize', checkWidth);
        };
    }, []);

    const handleClick = (comic) => {
        setComicDetail(comic);
        setIsComicDetailOpen(true);
    };

    const handleChapterClick = (comic, chapter, e) => {
        e.stopPropagation();
        navigate(
            `/read-comic/${slugify(comic.title, comic.id)}/${slugify(
                chapter.title,
                chapter.id
            )}`
        );
    };

    return (
        <div
            className={style.comic}
            onClick={() => handleClick(comic)}
            ref={comicRef}
        >
            {onDelete && (
                <div
                    className={style.deleteButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(comic.id);
                    }}
                >
                    {isLoading ? <LoadingOutlined /> : <CloseOutlined />}
                </div>
            )}
            <a className={style.comicBG}>
                <img src={comic.cover_image} alt='' />
            </a>
            <div className={style.comicInfo}>
                <h3
                    style={{
                        ...titleStyle,
                        marginTop: isSmallWidth ? '0px' : '10px'
                    }}
                >
                    {comic.title}
                </h3>
                <div className={style.comicChapters}>
                    {historyChapter ? (
                        <div
                            className={style.chapter}
                            style={{
                                ...chapterStyle,
                                color: '#ffffff',
                                marginBottom: '20px',
                                fontSize: isSmallWidth ? '9px' : '11px'
                            }}
                        >
                            <a
                                onClick={(e) =>
                                    handleChapterClick(comic, historyChapter, e)
                                }
                            >
                                {historyChapter.title}
                            </a>
                            <span>
                                {dayjs(historyChapter.created_at).fromNow()}
                            </span>
                        </div>
                    ) : (
                        comic.chapters.slice().map((chapter, index) => (
                            <div
                                className={style.chapter}
                                style={{
                                    ...chapterStyle,
                                    color: chapterStatus(chapter)
                                        ? '#9d9d9d'
                                        : '#ffffff',
                                    opacity: chapterStatus(chapter) ? 0.5 : 1,
                                    fontSize: isSmallWidth ? '9px' : '11px'
                                }}
                                key={index}
                            >
                                <a
                                    onClick={(e) =>
                                        handleChapterClick(comic, chapter, e)
                                    }
                                >
                                    {chapter.title}
                                </a>
                                <span>
                                    {dayjs(chapter.created_at).fromNow()}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comic;
