import dayjs from 'dayjs';
import style from './style.module.scss';

const Chapter = ({ chapter, onClick }) => {
    return (
        <div onClick={onClick} className={style.chapterItem} key={chapter.id}>
            <span className={style.chapterTitle}>{chapter.title}</span>
            <span className={style.chapterTime}>
                {dayjs(chapter.created_at).fromNow()}
            </span>
        </div>
    );
};

export default Chapter;
