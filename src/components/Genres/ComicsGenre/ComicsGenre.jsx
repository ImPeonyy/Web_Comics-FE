import { ArrowLeftOutlined } from '@ant-design/icons';
import ComicContainer from '@components/ComicContainer/ComicContainer';
import { ComicsGenreContext } from '@contexts/ComicsGenreProvider';
import Pagination from '@components/Pagination/Pagination';
import style from './style.module.scss';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const ComicsGenre = () => {
    const { comics, genre, pagination, fetchComics } =
        useContext(ComicsGenreContext);
    const navigate = useNavigate();

    const handlePageChange = (newPage) => {
        fetchComics(newPage);
    };

    return (
        <section className={style.genreComic}>
            <div className={style.container}>
                <div className={style.title}>
                    <div
                        className={style.titleIcon}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeftOutlined />
                    </div>
                    <div className={style.titleText}>
                        <span>Truyện theo thể loại: {genre}</span>
                    </div>
                </div>
                <div className={style.content}>
                    <ComicContainer comics={comics} />
                </div>
                <Pagination
                    currentPage={pagination.current_page}
                    lastPage={pagination.last_page}
                    onPageChange={handlePageChange}
                />
            </div>
        </section>
    );
};

export default ComicsGenre;
