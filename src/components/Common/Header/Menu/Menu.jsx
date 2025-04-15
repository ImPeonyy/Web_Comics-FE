import style from './style.module.scss';

const Menu = ({ title, onClick }) => {
    return (
        <div className={style.menuItem} onClick={onClick}>
            {title}
        </div>
    );
};

export default Menu;
