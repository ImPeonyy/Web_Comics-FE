import ComicContainer from '@components/ComicContainer/ComicContainer';
import { HomePageContext } from '@contexts/HomePageProvider';
import LoadingPage from '@components/Loading/LoadingPage/LoadingPage';
import Pagination from '@components/Pagination/Pagination';
import style from './style.module.scss';
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

const MainContainer = () => {
    const { allComics, pagination, fetchAllComics, isAllComicsLoading } =
        useContext(HomePageContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
        fetchAllComics(newPage);
    };

    return (
        <div className={style.container}>
            <h1 className={style.title}>Tất cả truyện</h1>
            {isAllComicsLoading ? (
                <div className={style.loading}>
                    <LoadingPage />
                </div>
            ) : (
                <ComicContainer comics={allComics} />
            )}
            <Pagination
                currentPage={pagination.current_page}
                lastPage={pagination.last_page}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default MainContainer;
