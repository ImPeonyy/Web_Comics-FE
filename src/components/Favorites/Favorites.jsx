import { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ArrowLeftOutlined } from '@ant-design/icons';
import ComicContainer from '@components/ComicContainer/ComicContainer';
import EmptyContent from '@components/EmptyContent/EmptyContent';
import { FavoritesContext } from '@contexts/FavoritesProvider';
import Pagination from '@components/Pagination/Pagination';
import { removeFav } from '@services/FavHisService';
import style from './style.module.scss';
import { toast } from 'react-toastify';

const Favorites = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const { data, pagination, fetchComics } = useContext(FavoritesContext);
    const [deletingComicId, setDeletingComicId] = useState(null);

    const comics = data.map((item) => item.comic);

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
        fetchComics(newPage);
    };

    const handleDeleteFavorite = (comicId) => {
        setDeletingComicId(comicId);
        removeFav(comicId)
            .then(() => {
                toast.success('Đã xóa truyện khỏi danh sách yêu thích');
                if (comics.length === 1 && pagination.current_page > 1) {
                    const prevPage = pagination.current_page - 1;
                    setSearchParams({ page: prevPage });
                    fetchComics(prevPage);
                } else {
                    fetchComics(pagination.current_page);
                }
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                console.error(error);
            })
            .finally(() => {
                setDeletingComicId(null);
            });
    };

    return (
        <section className={style.favoriteComics}>
            <div className={style.container}>
                <div className={style.title}>
                    <div
                        className={style.titleIcon}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeftOutlined />
                    </div>
                    <div className={style.titleText}>
                        <span>Danh sách truyện yêu thích</span>
                    </div>
                </div>
                <div className={style.content}>
                    {comics.length > 0 ? (
                        <ComicContainer
                            comics={comics}
                            onDelete={handleDeleteFavorite}
                            deletingComicId={deletingComicId}
                        />
                    ) : (
                        <div className={style.emptyContent}>
                            <EmptyContent content='Không có truyện yêu thích' />
                        </div>
                    )}
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

export default Favorites;
