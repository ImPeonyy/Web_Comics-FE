import { ConfigProvider, Tabs } from 'antd';

import Comic from './Comic/Comic.jsx';
import Feature from './Feature/Feature.jsx';
import { HomePageContext } from '@contexts/HomePageProvider';
import LoadingComponent from '@components/Loading/LoadingComponent/LoadingComponent.jsx';
import style from './style.module.scss';
import { useContext } from 'react';

const PopularFeatures = () => {
    const {
        features,
        statistic,
        topComicsByMonth,
        topComicsByWeek,
        topComicsByDay,
        isTopComicsLoading
    } = useContext(HomePageContext);

    const getComicsByTime = (title) => {
        if (title === 'Top Tháng') {
            return topComicsByMonth;
        } else if (title === 'Top Tuần') {
            return topComicsByWeek;
        } else if (title === 'Top Ngày') {
            return topComicsByDay;
        }
        return [];
    };

    return (
        <section className={style.PopularFeatures}>
            <div className={style.container}>
                <div>
                    <div className={style.gridItem}>
                        <div className={style.featureTitle}>
                            <span>Top Truyện</span>
                        </div>
                        <div>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Tabs: {
                                            cardPadding: 0,
                                            cardGutter: 0,
                                            lineHeight: 1.2,
                                            itemSelectedColor: '#f3aab5',
                                            itemActiveColor: '#f3aab5'
                                        }
                                    }
                                }}
                            >
                                <Tabs
                                    animated={{ inkBar: true, tabPane: true }}
                                    style={{
                                        padding: '60px 0px 0px 0px'
                                    }}
                                    type='card'
                                    items={statistic.map((item, index) => {
                                        const comics = getComicsByTime(
                                            item.title
                                        );
                                        return {
                                            label: `${item.title}`,
                                            key: index,
                                            children: (
                                                <div className={style.comics}>
                                                    {isTopComicsLoading ? (
                                                        <div
                                                            className={
                                                                style.loading
                                                            }
                                                        >
                                                            <LoadingComponent />
                                                        </div>
                                                    ) : comics.length === 0 ? (
                                                        <div
                                                            className={
                                                                style.emptyMessage
                                                            }
                                                        >
                                                            Không có dữ liệu
                                                        </div>
                                                    ) : (
                                                        comics.map(
                                                            (comic, index) => (
                                                                <Comic
                                                                    key={index}
                                                                    comic={
                                                                        comic
                                                                    }
                                                                    chapter={
                                                                        comic.chapters
                                                                    }
                                                                    view={
                                                                        comic.view_count
                                                                    }
                                                                />
                                                            )
                                                        )
                                                    )}
                                                </div>
                                            )
                                        };
                                    })}
                                />
                            </ConfigProvider>
                        </div>
                    </div>
                </div>
                {features.map((item, index) => {
                    return (
                        <Feature
                            key={index}
                            title={item.title}
                            href={item.href}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default PopularFeatures;
