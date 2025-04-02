import style from './style.module.scss';

const MainLayout = ({ children }) => {
    const { wrap } = style;

    return <main className={wrap}>{children}</main>;
};

export default MainLayout;
