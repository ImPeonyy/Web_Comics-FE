import { CloudUploadOutlined, EyeOutlined } from '@ant-design/icons';

import { ComicDetailContext } from '@contexts/ComicDetailProvider';
import GenreTag from '@components/Genres/GenreTag/GenreTag';
import dayjs from 'dayjs';
import style from './style.module.scss';
import { useContext } from 'react';

const Comic = ({ comic }) => {
    const { setIsComicDetailOpen, setComicDetail } =
        useContext(ComicDetailContext);

    const handleClick = () => {
        setComicDetail(comic);
        setIsComicDetailOpen(true);
    };

    return (
        <div className={style.comicContainer} onClick={handleClick}>
            <div className={style.comicImage}>
                <img src={comic.cover_image} alt={comic.title} />
            </div>
            <div className={style.comicInfo}>
                <div className={style.comicTitle}>{comic.title}</div>
                <div className={style.infoItem}>
                    <div className={style.author}>
                        <span>Tác giả: {comic.author}</span>
                    </div>
                    <div className={style.view}>
                        <EyeOutlined />
                        <span>{comic.totalViews}</span>
                    </div>
                    <div className={style.published}>
                        <CloudUploadOutlined />
                        <span>
                            {dayjs(comic.created_at).format('DD-MM-YYYY')}
                        </span>
                    </div>
                </div>
                <div className={style.genresList}>
                    <GenreTag type='status' title={comic.status} />
                </div>
            </div>
        </div>
    );
};

export default Comic;
