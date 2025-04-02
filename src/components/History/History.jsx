import { ArrowLeftOutlined } from '@ant-design/icons';
import ComicContainer from '@components/ComicContainer/ComicContainer';
import { Pagination } from 'antd';
import style from './style.module.scss';

const History = () => {
    return (
        <section className={style.history}>
            <div className={style.container}>
                <div className={style.title}>
                    <div className={style.titleIcon}>
                        <ArrowLeftOutlined />
                    </div>
                    <div className={style.titleText}>
                        <span>Lịch sử đọc truyện</span>
                    </div>
                </div>
                <div className={style.content}>
                    <ComicContainer />
                </div>
                <div className={style.pagination}>
                    <Pagination align='center' defaultCurrent={6} total={500} />
                </div>
            </div>
        </section>
    );
};

export default History;
