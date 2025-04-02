import CoverImage from '@images/cover-image.jpg';
import style from './style.module.scss';

const Comic = ({ titleStyle, chapterStyle }) => {
    return (
        <div className={style.comic}>
            <a href='' className={style.comicBG}>
                <img src={CoverImage} alt='' />
            </a>
            <div className={style.comicInfo}>
                <h3 style={titleStyle}>Người Chơi Không Thể Thăng Cấp</h3>
                <div className={style.comicChapters}>
                    <div className={style.chapter} style={chapterStyle}>
                        <a href=''>Chương 3</a>
                        <span>3 ngày trước</span>
                    </div>
                    <div className={style.chapter} style={chapterStyle}>
                        <a href=''>Chương 2</a>
                        <span>3 ngày trước</span>
                    </div>
                    <div className={style.chapter} style={chapterStyle}>
                        <a href=''>Chương 1</a>
                        <span>3 ngày trước</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comic;
