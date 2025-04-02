import {
    DownOutlined,
    FilterOutlined,
    HeartFilled,
    HistoryOutlined,
    LogoutOutlined,
    RightOutlined,
    SearchOutlined,
    StarFilled,
    UserOutlined
} from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';

import { AuthFormContext } from '@contexts/AuthFormProvider';
import Cookies from 'js-cookie';
import Logo from '@images/logo.png';
import Menu from './Menu/Menu.jsx';
import { StoreContext } from '@contexts/StoreProvider';
import { ToastContext } from '@contexts/ToastProvider';
import { dataMenu } from './constants';
import { signOut } from '@services/AuthService';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isShowUserSubMenu, setIsShowUserSubMenu] = useState(false);
    const [isShowGenresSubMenu, setIsShowGenresSubMenu] = useState(false);

    const { setIsOpen } = useContext(AuthFormContext);
    const { myInfo, setMyInfo, genres } = useContext(StoreContext);
    const { toast } = useContext(ToastContext);

    const navigate = useNavigate();

    const handleOpenModal = () => {
        if (!myInfo) {
            setIsOpen(true);
        }
    };

    const handleUserHover = () => {
        if (myInfo) {
            setIsShowUserSubMenu(!isShowUserSubMenu);
        }
    };

    const handleGenresHover = () => {
        setIsShowGenresSubMenu(!isShowGenresSubMenu);
    };

    const handleSignOut = (e) => {
        e.stopPropagation();
        signOut()
            .then(() => {
                navigate('/');
                window.location.reload();
                Cookies.remove('token');
                Cookies.remove('userID');
            })
            .catch((err) => {
                toast.error(err.response.data.message);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            });
        setMyInfo(null);
    };

    const handleMyInfo = (e) => {
        e.stopPropagation();
        navigate('/my-info');
    };

    const handleHistory = (e) => {
        e.stopPropagation();
        navigate('/history');
    };

    const handleFavorite = (e) => {
        e.stopPropagation();
        navigate('/favorite');
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={`${style.header} ${isScrolled ? style.scrolled : ''}`}
        >
            <div className={style.container}>
                <a href='/' className={style.headerLogo}>
                    <img src={Logo} alt='Trang Chủ' />
                </a>
                <div className={style.headerFilter}>
                    <label htmlFor='search-input'>
                        <SearchOutlined />
                    </label>
                    <input
                        id='search-input'
                        type='text'
                        placeholder='Tìm truyện...'
                    />
                    <div className={style.filterIcon}>
                        <FilterOutlined />
                    </div>
                </div>
                <div className={style.headerMenu}>
                    <div className={style.genreMenuContainer}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                height: '100%'
                            }}
                            onMouseEnter={handleGenresHover}
                            onMouseLeave={handleGenresHover}
                        >
                            <div
                                className={style.genreMenu}
                                style={{
                                    color: isShowGenresSubMenu
                                        ? '#f3aab5'
                                        : '#fff'
                                }}
                            >
                                <span>Thể Loại</span>
                                <div
                                    className={style.genreMenuIcon}
                                    style={{
                                        transition: 'transform 0.3s ease',
                                        transform: isShowGenresSubMenu
                                            ? 'scale(0.6) rotate(180deg)'
                                            : 'scale(0.6) rotate(0deg)'
                                    }}
                                >
                                    <DownOutlined />
                                </div>
                            </div>
                            {isShowGenresSubMenu && (
                                <span className={style.GenresSubMenu}>
                                    {genres.map((genre, index) => {
                                        return (
                                            <div
                                                className={style.genreItem}
                                                key={index}
                                            >
                                                <div
                                                    className={
                                                        style.genreItemIcon
                                                    }
                                                >
                                                    <RightOutlined />
                                                </div>
                                                {genre.name}
                                            </div>
                                        );
                                    })}
                                </span>
                            )}
                        </div>
                    </div>
                    {dataMenu.map((item, index) => {
                        return (
                            <Menu
                                key={index}
                                content={item.content}
                                href={item.href}
                            />
                        );
                    })}
                </div>
                <div className={style.headerUser}>
                    <div className={style.luckyIcon}>
                        <StarFilled />
                    </div>
                    <div
                        className={style.userIcon}
                        onClick={handleOpenModal}
                        onMouseEnter={handleUserHover}
                        onMouseLeave={handleUserHover}
                    >
                        <UserOutlined />
                        {isShowUserSubMenu && (
                            <span className={style.UserSubMenu}>
                                <span onClick={handleMyInfo}>
                                    <UserOutlined />
                                    <p>{myInfo.username}</p>
                                </span>
                                <span onClick={handleHistory}>
                                    <HistoryOutlined />
                                    <p>Lịch sử</p>
                                </span>
                                <span onClick={handleFavorite}>
                                    <HeartFilled />
                                    <p>Yêu thích</p>
                                </span>
                                <span onClick={handleSignOut}>
                                    <LogoutOutlined />
                                    <p>Đăng xuất</p>
                                </span>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
