import { InboxOutlined } from '@ant-design/icons';
import style from './style.module.scss';

const EmptyContent = ({ content }) => {
    return (
        <div className={style.emptyContent}>
            <span>
                <InboxOutlined />
            </span>
            <span>{content}</span>
        </div>
    );
};

export default EmptyContent;
