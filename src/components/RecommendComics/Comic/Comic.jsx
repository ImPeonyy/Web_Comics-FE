import {
    EyeOutlined,
    HeartFilled,
    HeartOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import { addFav, removeFav } from '@services/FavHisService';
import { useContext, useState } from 'react';

import { ComicDetailContext } from '@contexts/ComicDetailProvider';
import GenreTag from '@components/Genres/GenreTag/GenreTag';
import style from './style.module.scss';
import { toast } from 'react-toastify';

const Comic = ({ comic }) => {
    const { setIsComicDetailOpen, setComicDetail } =
        useContext(ComicDetailContext);
    const [isFavorite, setIsFavorite] = useState(comic.isFav);
    const [isFavLoading, setIsFavLoading] = useState(false);

    const handleClick = () => {
        setComicDetail(comic);
        setIsComicDetailOpen(true);
    };

    const handleFavorite = (e) => {
        e.stopPropagation();
        setIsFavLoading(true);
        if (isFavorite) {
            removeFav(comic.id)
                .then((res) => {
                    toast.warn(res.data.message);
                    setIsFavorite(!isFavorite);
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                })
                .finally(() => {
                    setIsFavLoading(false);
                });
        } else {
            addFav(comic.id)
                .then((res) => {
                    toast.success(res.data.message);
                    setIsFavorite(!isFavorite);
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                })
                .finally(() => {
                    setIsFavLoading(false);
                });
        }
    };

    return (
        <a className={style.item} onClick={handleClick}>
            <img className={style.background} src={comic.cover_image}></img>
            <div className={style.bgBanner}></div>
            <div className={style.container}>
                <div className={style.itemCoverImage}>
                    <img src={comic.cover_image} alt='' />
                </div>
                <div className={style.comicInfo}>
                    <h1>{comic.title}</h1>
                    <div className={style.genresList}>
                        <GenreTag
                            type='status'
                            title={comic.status}
                            onClick={() => {
                                setIsComicDetailOpen(false);
                            }}
                        />
                        {comic.genres.map((genre) => (
                            <GenreTag
                                key={genre.id}
                                type='genre'
                                title={genre.name}
                                genre={genre}
                                onClick={() => {
                                    setIsComicDetailOpen(false);
                                }}
                            />
                        ))}
                    </div>
                    <div className={style.desciption}>{comic.description}</div>
                    <div className={style.actions}>
                        <div className={style.actionView}>
                            <EyeOutlined />
                            <span>{comic.totalViews}</span>
                        </div>
                        <div
                            className={style.actionHeart}
                            onClick={handleFavorite}
                        >
                            {isFavLoading ? (
                                <LoadingOutlined />
                            ) : isFavorite ? (
                                <HeartFilled />
                            ) : (
                                <HeartOutlined />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default Comic;
