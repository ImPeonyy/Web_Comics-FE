import style from './style.module.scss';
import CoverImage from '@images/cover-image.jpg';

const Comic = () => {
    return (
        <div className={style.comicContainer}>
            <a href='#' className={style.comicCoverImage}>
                <div>
                    <img src={CoverImage} alt='' />
                </div>
            </a>
            <div className={style.comicInfo}>
                <h3 className={style.comicTitle}>
                    <a href='#'>Người Chơi Không Thể Thăng Cấp</a>
                </h3>
                <a href='' className={style.comicChapter}>Chapter 181</a>
                <div className={style.comicUpdateAt}>23 Giờ Trước</div>
            </div>
        </div>
    );
};

export default Comic;
