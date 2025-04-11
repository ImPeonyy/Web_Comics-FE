import { EyeOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { addFav, removeFav } from '@services/FavHisService';
import { useContext, useState } from 'react';

import { ComicDetailContext } from '@contexts/ComicDetailProvider';
import GenreTag from '@components/Genres/GenreTag/GenreTag';
import style from './style.module.scss';

const Comic = ({ comic }) => {
    const { setIsComicDetailOpen, setComicDetail } =
        useContext(ComicDetailContext);
    const [isFavorite, setIsFavorite] = useState(comic.isFavorite);

    const handleClick = () => {
        setComicDetail(comic);
        setIsComicDetailOpen(true);
    };

    const handleFavorite = (e) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
        if (isFavorite) {
            removeFav(comic.id).catch((err) => {
                console.log(err);
            });
        } else {
            addFav(comic.id).catch((err) => {
                console.log(err);
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
                        <GenreTag type='status' title={comic.status} />
                        {comic.genres.map((genre) => (
                            <GenreTag
                                key={genre.id}
                                type='genre'
                                title={genre.name}
                                genre={genre}
                            />
                        ))}
                    </div>
                    <div className={style.desciption}>{comic.description}</div>
                    <div className={style.actions}>
                        <div className={style.actionView}>
                            <EyeOutlined />
                            <span>{comic.view}</span>
                        </div>
                        <div
                            className={style.actionHeart}
                            onClick={handleFavorite}
                        >
                            {isFavorite ? <HeartFilled /> : <HeartOutlined />}
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default Comic;
