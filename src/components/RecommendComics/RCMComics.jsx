import { Carousel, ConfigProvider } from 'antd';

import Comic from '@components/RecommendComics/Comic/Comic';
import { HomePageContext } from '@contexts/HomePageProvider';
import LoadingComponent from '@components/Loading/LoadingComponent/LoadingComponent';
import style from './style.module.scss';
import { useContext } from 'react';

const RCMComics = () => {
    const { recommendComics } = useContext(HomePageContext);

    if (recommendComics.length === 0) {
        return (
            <div className={style.loading}>
                <LoadingComponent />
            </div>
        );
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Carousel: {
                        arrowSize: 25,
                        arrowOffset: 15
                    }
                }
            }}
        >
            <Carousel
                // autoplay={{
                //     dotDuration: true
                // }}
                // autoplaySpeed={5000}
                arrows
                infinite={true}
                draggable={true}
                className={style.carousel}
            >
                {recommendComics.map((item, index) => (
                    <Comic key={index} comic={item} />
                ))}
            </Carousel>
        </ConfigProvider>
    );
};

export default RCMComics;
