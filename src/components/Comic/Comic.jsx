import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';

import { ComicDetailContext } from '@contexts/ComicDetailProvider';
import { chapterStatus } from '@utils/commonUtils';
import dayjs from 'dayjs';
import { slugify } from '@utils/slugifyUtils';
import style from './style.module.scss';
import { useContext } from 'react';
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

    const navigate = useNavigate();

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
        <div className={style.comic} onClick={() => handleClick(comic)}>
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
                <h3 style={titleStyle}>{comic.title}</h3>
                <div className={style.comicChapters}>
                    {historyChapter ? (
                        <div
                            className={style.chapter}
                            style={{
                                ...chapterStyle,
                                color: '#ffffff',
                                marginBottom: '20px'
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
                                    opacity: chapterStatus(chapter) ? 0.5 : 1
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
