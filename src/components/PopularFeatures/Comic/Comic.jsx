import { ComicDetailContext } from '@contexts/ComicDetailProvider';
import { EyeOutlined } from '@ant-design/icons';
import { StoreContext } from '@contexts/StoreProvider';
import dayjs from 'dayjs';
import { slugify } from '@utils/slugifyUtils';
import style from './style.module.scss';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Comic = ({ comic, historyChapter, views }) => {
    const { setComicDetail, setIsComicDetailOpen } =
        useContext(ComicDetailContext);
    const { chapterStatus } = useContext(StoreContext);

    const navigate = useNavigate();
    const chapter = historyChapter ? historyChapter : comic.chapters[0];

    const handleClick = () => {
        setComicDetail(comic);
        setIsComicDetailOpen(true);
    };

    const handleChapterClick = (chapter, e) => {
        e.stopPropagation();
        navigate(
            `/read-comic/${slugify(comic.title, comic.id)}/${slugify(
                chapter.title,
                chapter.id
            )}`
        );
    };

    if (!comic) return null;

    return (
        <div className={style.comicContainer}>
            <span onClick={handleClick} className={style.comicCoverImage}>
                <div>
                    <img src={comic.cover_image} alt='' />
                </div>
            </span>
            <div className={style.comicInfo}>
                <h3 className={style.comicTitle}>
                    <span onClick={handleClick}>{comic.title}</span>
                </h3>
                <span
                    className={style.comicChapter}
                    onClick={(e) => handleChapterClick(chapter, e)}
                    style={{
                        color: chapterStatus(chapter) ? '#9d9d9d' : '#ffffff',
                        opacity: chapterStatus(chapter) ? 0.5 : 1
                    }}
                >
                    {chapter.title}
                </span>
                <div className={style.comicSubInfo}>
                    {views && (
                        <span className={style.comicView}>
                            <EyeOutlined />
                            {views}
                        </span>
                    )}
                    <span className={style.comicUpdateAt}>
                        {dayjs(chapter.updated_at).fromNow()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Comic;
