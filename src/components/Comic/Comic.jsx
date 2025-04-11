import CoverImage from '@images/cover-image.jpg';
import dayjs from 'dayjs';
import style from './style.module.scss';

const Comic = ({ titleStyle, chapterStyle, comic }) => {
    return (
        <div className={style.comic}>
            <a href='' className={style.comicBG}>
                <img src={comic.cover_image} alt='' />
            </a>
            <div className={style.comicInfo}>
                <h3 style={titleStyle}>{comic.title}</h3>
                <div className={style.comicChapters}>
                    {comic.chapters.map((chapter, index) => (
                        <div
                            className={style.chapter}
                            style={chapterStyle}
                            key={index}
                        >
                            <a href=''>{chapter.title}</a>
                            <span>{dayjs(chapter.created_at).fromNow()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Comic;
