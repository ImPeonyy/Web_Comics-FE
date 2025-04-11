import style from './style.module.scss';

const CustomLoading = ({ text = 'Đang tải...', sizeBar = 10 }) => {
    return (
        <div className={style.loader}>
            <div className={style['loader-text']}>{text}</div>
            <div
                className={style['loader-bar']}
                style={{ height: sizeBar }}
            ></div>
        </div>
    );
};

export default CustomLoading;
