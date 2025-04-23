import { StoreContext } from '@contexts/StoreProvider';
import dayjs from 'dayjs';
import style from './style.module.scss';
import { useContext } from 'react';

const Chapter = ({ chapter, onClick }) => {
    const { chapterStatus } = useContext(StoreContext);
    return (
        <div
            onClick={onClick}
            className={style.chapterItem}
            key={chapter.id}
            style={{
                color: chapterStatus(chapter) ? '#9d9d9d' : '#ffffff',
                opacity: chapterStatus(chapter) ? 0.5 : 1
            }}
        >
            <span className={style.chapterTitle}>{chapter.title}</span>
            <span className={style.chapterTime}>
                {dayjs(chapter.created_at).fromNow()}
            </span>
        </div>
    );
};

export default Chapter;
