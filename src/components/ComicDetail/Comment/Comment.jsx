import 'dayjs/locale/en';

import { calcCurrentLevel } from '@utils/calcLevelUtils';
import dayjs from 'dayjs';
import style from './style.module.scss';

const Comment = ({ comment }) => {
    const level = calcCurrentLevel(comment.user.exp);

    return (
        <div className={style.commentItem}>
            <style>
                {`
                    @keyframes progress-animation {
                        100% {
                            background-position: 0% 50%;
                        }
                        0% {
                            background-position: 100% 50%;
                        }
                    }
                `}
            </style>
            <div className={style.commentAvatar}>
                <img src={comment.user.avatar} alt={comment.user.username} />
                <span
                    className={style.commentLevel}
                    style={{
                        background: level.style,
                        backgroundSize: '300% 100%',
                        WebkitBackgroundClip: 'text',
                        animation: 'progress-animation 2s linear infinite',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    {level.name}
                </span>
            </div>
            <div className={style.commentContent}>
                <div className={style.itemHeader}>
                    <span className={style.itemUsername}>
                        {comment.user.username}
                    </span>
                    <span className={style.itemTime}>
                        {dayjs(comment.created_at).fromNow()}
                    </span>
                </div>
                <div className={style.itemContent}>
                    <span>{comment.content}</span>
                </div>
            </div>
        </div>
    );
};

export default Comment;
