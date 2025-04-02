import CoverImage from '@images/cover-image.jpg';
import style from './style.module.scss';

const Comic = ({ comic }) => {
    console.log(comic);
    return (
        <div className={style.item}>
            <img className={style.background} src={comic.cover_image}></img>
            <div className={style.bgBanner}></div>
            <div className={style.container}>
                <div className={style.itemCoverImage}>
                    <img src={comic.cover_image} alt='' />
                </div>
                <div className={style.comicInfo}>
                    <h1>{comic.title}</h1>
                    <div className={style.genre}>
                        <div className={style.status}>{comic.status}</div>
                        <div className={style.genresList}>Genre1</div>
                        <div className={style.genresList}>Genre2</div>
                        <div className={style.genresList}>Genre3</div>
                    </div>
                    <div className={style.desciption}>{comic.description}</div>
                    <div className={style.actions}>
                        <div className={style.actionView}>
                            <ion-icon name='eye-outline'></ion-icon>
                            <span>100k</span>
                        </div>
                        <div className={style.actionHeart}>
                            <ion-icon name='heart-outline'></ion-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comic;
