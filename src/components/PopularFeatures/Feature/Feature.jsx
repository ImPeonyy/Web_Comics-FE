import { useContext, useEffect, useState } from 'react';

import { ArrowRightOutlined } from '@ant-design/icons';
import Comic from '../Comic/Comic.jsx';
import { HomePageContext } from '@contexts/HomePageProvider';
import LoadingComponent from '@components/Loading/LoadingComponent/LoadingComponent.jsx';
import style from './style.module.scss';

const Feature = ({ title, href }) => {
    const { favoriteComics, isFavLoading, historyComics, isHistoryLoading } =
        useContext(HomePageContext);
    const [comics, setComics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (title === 'Truyện Yêu Thích') {
            setComics(favoriteComics);
            setIsLoading(isFavLoading);
        }
        if (title === 'Lịch Sử') {
            setComics(historyComics);
            setIsLoading(isHistoryLoading);
        }
    }, [comics, isFavLoading, isHistoryLoading]);

    return (
        <div>
            <div className={style.gridItem}>
                <div className={style.featureTitle}>
                    <span>{title}</span>
                    <a href={href} className={style.fowardIcon}>
                        <ArrowRightOutlined />
                    </a>
                </div>
                <div className={style.comics}>
                    {isLoading ? (
                        <div className={style.loading}>
                            <LoadingComponent />
                        </div>
                    ) : comics.length === 0 ? (
                        <div className={style.emptyMessage}>
                            {title === 'Truyện Yêu Thích'
                                ? 'Bạn chưa có truyện yêu thích nào'
                                : 'Bạn chưa đọc truyện nào'}
                        </div>
                    ) : (
                        comics.map((data) => (
                            <Comic
                                key={data.id}
                                comic={data.comic}
                                chapter={
                                    title === 'Truyện Yêu Thích'
                                        ? data.comic.chapters
                                        : data.chapter
                                }
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Feature;
