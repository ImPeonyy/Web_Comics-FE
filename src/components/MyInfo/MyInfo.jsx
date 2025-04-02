import { ConfigProvider, Tabs } from 'antd';

import ChangePassword from '@components/MyInfo/ChangePassword/ChangePassword';
import Info from '@components/MyInfo/Info/Info';
import style from './style.module.scss';
import { tabs } from './constants';

const MyInfo = () => {
    return (
        <section className={style.myInfo}>
            <div className={style.container}>
                <div className={style.tabsContainer}>
                    <ConfigProvider
                        theme={{
                            components: {
                                Tabs: {
                                    cardPadding: 20,
                                    cardGutter: 20,
                                    lineHeight: 5,
                                    itemSelectedColor: '#f3aab5',
                                    itemActiveColor: '#f3aab5',
                                    colorPrimary: '#f3aab5',
                                    controlHeight: 250
                                }
                            }
                        }}
                    >
                        <Tabs
                            animated={{ inkBar: true, tabPane: true }}
                            size='large'
                            tabPosition={'left'}
                            items={tabs.map((item, index) => {
                                return {
                                    label: item.title,
                                    key: index,
                                    children: (
                                        <div className={style.tabContent}>
                                            <div>
                                                <h1
                                                    style={{
                                                        lineHeight: 'normal',
                                                        color: '#f3aab5'
                                                    }}
                                                >
                                                    {item.title}
                                                </h1>
                                            </div>
                                            {index === 0 && <Info />}
                                            {index === 1 && <ChangePassword />}
                                        </div>
                                    )
                                };
                            })}
                        />
                    </ConfigProvider>
                </div>
            </div>
        </section>
    );
};

export default MyInfo;
