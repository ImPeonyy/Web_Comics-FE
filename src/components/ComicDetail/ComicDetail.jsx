import 'dayjs/locale/vi';

import {
    CloudUploadOutlined,
    CommentOutlined,
    EyeOutlined,
    HeartFilled,
    HeartOutlined,
    ReadOutlined,
    SendOutlined
} from '@ant-design/icons';
import { useContext, useState } from 'react';

import Chapter from '@components/ComicDetail/Chapter/Chapter';
import { ComicDetailContext } from '@contexts/ComicDetailProvider';
import Comment from '@components/ComicDetail/Comment/Comment';
import GenreTag from '@components/Genres/GenreTag/GenreTag';
import TinyLoading from '@components/Loading/TinyLoading/TinyLoading';
import dayjs from 'dayjs';
import { postComment } from '@services/ComicService';
import relativeTime from 'dayjs/plugin/relativeTime';
import { slugify } from '@utils/slugifyUtils';
import style from './style.module.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

dayjs.extend(relativeTime);
dayjs.locale('vi');

const ComicDetail = () => {
    const navigate = useNavigate();

    const {
        isComicDetailOpen,
        setIsComicDetailOpen,
        comicDetail,
        chapterList,
        handleFavorite,
        commentList,
        cmtCount,
        fetchCommentList
    } = useContext(ComicDetailContext);

    const [postCmtLoading, setPostCmtLoading] = useState(false);

    const handleOverlayClick = () => {
        setIsComicDetailOpen(false);
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    const handleChapterClick = (chapter) => {
        setIsComicDetailOpen(false);
        navigate(
            `/read-comic/${slugify(
                comicDetail.title,
                comicDetail.id
            )}/${slugify(chapter.title, chapter.id)}`
        );
    };

    const handleReadFirstChapter = () => {
        if (chapterList.length > 0) {
            console.log(chapterList);
            const firstChapter = chapterList[chapterList.length - 1]; // Lấy chapter đầu tiên (cũ nhất)
            handleChapterClick(firstChapter);
        }
    };

    const handleReadLastChapter = () => {
        if (chapterList.length > 0) {
            const lastChapter = chapterList[0]; // Lấy chapter mới nhất
            handleChapterClick(lastChapter);
        }
    };

    const handlePostComment = () => {
        setPostCmtLoading(true);
        const content = document.getElementById('content').value;

        postComment(comicDetail.id, content)
            .then(() => {
                fetchCommentList();
                document.getElementById('content').value = '';
                toast.success('Đã gửi bình luận!');
                setPostCmtLoading(false);
            })
            .catch((err) => {
                toast.error('Lỗi khi bình luận!');
                console.log(err);
                setPostCmtLoading(false);
            });
    };

    return (
        <>
            {isComicDetailOpen && (
                <div
                    className={style.backgroundModal}
                    onClick={handleOverlayClick}
                >
                    <div
                        className={style.comicDetailModal}
                        onClick={handleContentClick}
                    >
                        <div className={style.comicDetailHeader}>
                            <div className={style.item}>
                                <img
                                    className={style.background}
                                    src={comicDetail.cover_image}
                                ></img>
                                <div className={style.bgBanner}></div>
                                <div className={style.container}>
                                    <div className={style.itemCoverImage}>
                                        <img
                                            src={comicDetail.cover_image}
                                            alt=''
                                        />
                                    </div>
                                    <div className={style.comicInfo}>
                                        <h1>{comicDetail.title}</h1>
                                        <div className={style.author}>
                                            Tác giả: {comicDetail.author}
                                        </div>
                                        <div className={style.genresList}>
                                            <GenreTag
                                                type='status'
                                                title={comicDetail.status}
                                            />
                                            {comicDetail.genres.map((genre) => (
                                                <GenreTag
                                                    key={genre.id}
                                                    type='genre'
                                                    title={genre.name}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.comicDetailContainer}>
                            <div className={style.actionsContainer}>
                                <div className={style.actions}>
                                    <button
                                        className={style.firstEp}
                                        onClick={handleReadFirstChapter}
                                    >
                                        <ReadOutlined />
                                        <span>Đọc từ đầu</span>
                                    </button>
                                    <button
                                        className={style.lastEp}
                                        onClick={handleReadLastChapter}
                                    >
                                        <span>Đọc mới nhất</span>
                                    </button>
                                </div>
                                <button
                                    className={`${style.favorite} ${
                                        comicDetail.isFavorite
                                            ? style.favoriteActive
                                            : ''
                                    }`}
                                    onClick={handleFavorite}
                                >
                                    {comicDetail.isFavorite ? (
                                        <HeartFilled />
                                    ) : (
                                        <HeartOutlined />
                                    )}
                                    <span>
                                        {comicDetail.isFavorite
                                            ? 'Đã yêu thích'
                                            : 'Yêu thích'}
                                    </span>
                                </button>
                                <div className={style.info}>
                                    <div className={style.view}>
                                        <EyeOutlined />
                                        <span>{comicDetail.view}</span>
                                    </div>
                                    <div className={style.published}>
                                        <CloudUploadOutlined />
                                        <span>
                                            {dayjs(
                                                comicDetail.created_at
                                            ).format('DD-MM-YYYY')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={style.mainContainer}>
                                <div className={style.chapterContainer}>
                                    <div className={style.description}>
                                        <span>
                                            {comicDetail.description ||
                                                'Theo Dõi Peonyy~ Comics để xem thêm nhiều truyện mới nha!'}
                                        </span>
                                    </div>
                                    <div className={style.chapterList}>
                                        {chapterList.map((chapter) => (
                                            <Chapter
                                                key={chapter.id}
                                                chapter={chapter}
                                                onClick={() => {
                                                    handleChapterClick(chapter);
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className={style.commentContainer}>
                                    <div className={style.commentHeader}>
                                        <div className={style.commentTitle}>
                                            <CommentOutlined />
                                            <span>Bình Luận ({cmtCount})</span>
                                        </div>
                                        <div
                                            className={style.sendButton}
                                            onClick={handlePostComment}
                                        >
                                            {postCmtLoading ? (
                                                <TinyLoading />
                                            ) : (
                                                <SendOutlined />
                                            )}
                                        </div>
                                    </div>
                                    <div className={style.commentInput}>
                                        <textarea
                                            id='content'
                                            placeholder='Nhập bình luận...'
                                            required
                                            disabled={postCmtLoading}
                                        />
                                    </div>
                                    <div className={style.commentList}>
                                        {commentList.map((comment) => (
                                            <Comment
                                                key={comment.id}
                                                avatar={comment.user.avatar}
                                                username={comment.user.username}
                                                createdAt={comment.created_at}
                                                content={comment.content}
                                                exp={comment.user.exp}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ComicDetail;
