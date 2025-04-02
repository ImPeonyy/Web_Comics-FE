import { ConfigProvider, Tabs } from 'antd';
import { features, statistic } from './constant.js';

import Comic from './Comic/Comic.jsx';
import Feature from './Feature/Feature.jsx';
import style from './style.module.scss';

const PopularFeatures = () => {
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
                                        return {
                                            label: `${item.title}`,
                                            key: index,
                                            children: (
                                                <div className={style.comics}>
                                                    <Comic />
                                                    <Comic />
                                                    <Comic />
                                                    <Comic />
                                                    <Comic />
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
