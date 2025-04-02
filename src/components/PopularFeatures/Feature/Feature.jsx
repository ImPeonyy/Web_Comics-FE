import { ArrowRightOutlined } from '@ant-design/icons';
import Comic from '../Comic/Comic.jsx';
import style from './style.module.scss';

const Feature = ({ title, href }) => {
    return (
        <div>
            <div className={style.gridItem}>
                <div className={style.featureTitle}>
                    <span>{title}</span>
                    <a href='' className={style.fowardIcon}>
                        <ArrowRightOutlined />
                    </a>
                </div>
                <div className={style.comics}>
                    <Comic />
                    <Comic />
                    <Comic />
                    <Comic />
                    <Comic />
                    <Comic />
                </div>
            </div>
        </div>
    );
};

export default Feature;
