import { ComicDetailContext } from '@contexts/ComicDetailProvider';
import { EyeOutlined } from '@ant-design/icons';
import { chapterStatus } from '@utils/commonUtils';
import dayjs from 'dayjs';
import { slugify } from '@utils/slugifyUtils';
import style from './style.module.scss';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Comic = ({ comic, chapter, view }) => {
    const { setComicDetail, setIsComicDetailOpen } =
        useContext(ComicDetailContext);

    const navigate = useNavigate();

    const handleClick = () => {
        console.log(comic);
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
                    onClick={(e) =>
                        handleChapterClick(
                            Array.isArray(chapter) ? chapter[0] : chapter,
                            e
                        )
                    }
                    style={{
                        color: chapterStatus(
                            Array.isArray(chapter) ? chapter[0] : chapter
                        )
                            ? '#9d9d9d'
                            : '#ffffff',
                        opacity: chapterStatus(
                            Array.isArray(chapter) ? chapter[0] : chapter
                        )
                            ? 0.5
                            : 1
                    }}
                >
                    {Array.isArray(chapter) ? chapter[0].title : chapter.title}
                </span>
                <div className={style.comicSubInfo}>
                    {view && (
                        <span className={style.comicView}>
                            <EyeOutlined />
                            {view}
                        </span>
                    )}
                    <span className={style.comicUpdateAt}>
                        {dayjs(
                            Array.isArray(chapter)
                                ? comic.created_at
                                : chapter.updated_at
                        ).fromNow()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Comic;
