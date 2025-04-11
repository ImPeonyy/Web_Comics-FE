import style from './style.module.scss';

const TinyLoading = ({ size = 30 }) => {
    return (
        <div
            className={style.loader}
            style={{ width: size, height: size }}
        ></div>
    );
};

export default TinyLoading;
