import { Carousel, ConfigProvider } from 'antd';

import Comic from '@components/RecommendComics/Comic/Comic';
import { HomePageContext } from '@contexts/HomePageProvider';
import style from './style.module.scss';
import { useContext } from 'react';

const RCMComics = () => {
    const { recommendComics } = useContext(HomePageContext);

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
                autoplay={{
                    dotDuration: true
                }}
                autoplaySpeed={5000}
                arrows
                infinite={true}
                draggable={true}
                className={style.carousel}
            >
                {recommendComics.length === 0 ? (
                    <div>Chưa có dữ liệu truyện đề xuất</div> 
                ) : (
                    recommendComics.map((item, index) => (
                        <Comic key={index} comic={item}/>
                    ))
                )}
            </Carousel>
        </ConfigProvider>
    );
};

export default RCMComics;
