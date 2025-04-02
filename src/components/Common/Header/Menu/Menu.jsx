import style from './style.module.scss';

const Menu = ({ content, href }) => {
    return <div className={style.menuItem}>{content}</div>;
};

export default Menu;
