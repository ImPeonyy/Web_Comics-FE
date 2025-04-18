import { useNavigate, useSearchParams } from 'react-router-dom';

import { ArrowLeftOutlined } from '@ant-design/icons';
import ComicContainer from '@components/ComicContainer/ComicContainer';
import EmptyContent from '@components/EmptyContent/EmptyContent';
import { HistoryContext } from '@contexts/HistoryProvider';
import Pagination from '@components/Pagination/Pagination';
import style from './style.module.scss';
import { useContext } from 'react';

const History = () => {
    const { data, pagination, fetchComics } = useContext(HistoryContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
        fetchComics(newPage);
    };

    return (
        <section className={style.historyComics}>
            <div className={style.container}>
                <div className={style.title}>
                    <div
                        className={style.titleIcon}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeftOutlined />
                    </div>
                    <div className={style.titleText}>
                        <span>Lịch sử đọc truyện</span>
                    </div>
                </div>
                <div className={style.content}>
                    {data.length > 0 ? (
                        <ComicContainer comics={data} isHistory={true} />
                    ) : (
                        <div className={style.emptyContent}>
                            <EmptyContent content='Không có lịch sử đọc truyện' />
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

export default History;
