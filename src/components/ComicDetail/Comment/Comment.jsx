import { calcCurrentLevel } from '@utils/calcLevelUtils';
import dayjs from 'dayjs';
import style from './style.module.scss';

const Comment = ({ avatar, username, createdAt, content, exp }) => {
    const level = calcCurrentLevel(exp);
    console.log(level);

    return (
        <div className={style.commentItem}>
            <div className={style.commentAvatar}>
                <img src={avatar} alt={username} />
                <span
                    className={style.commentLevel}
                    style={{
                        background: level.style,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    {level.name}
                </span>
            </div>
            <div className={style.commentContent}>
                <div className={style.itemHeader}>
                    <span className={style.itemUsername}>{username}</span>
                    <span className={style.itemTime}>
                        {dayjs(createdAt).fromNow()}
                    </span>
                </div>
                <div className={style.itemContent}>
                    <span>{content}</span>
                </div>
            </div>
        </div>
    );
};

export default Comment;
