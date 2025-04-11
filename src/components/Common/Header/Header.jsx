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
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthFormContext } from '@contexts/AuthFormProvider';
import Comic from '@components/Common/Header/Comic/Comic.jsx';
import { ComicDetailContext } from '@contexts/ComicDetailProvider';
import Cookies from 'js-cookie';
import CustomLoading from '@components/Loading/CustomLoading/CustomLoading.jsx';
import Logo from '@images/logo.png';
import Menu from './Menu/Menu.jsx';
import { StoreContext } from '@contexts/StoreProvider';
import TinyLoading from '@components/Loading/TinyLoading/TinyLoading.jsx';
import { ToastContext } from '@contexts/ToastProvider';
import { dataMenu } from './constants';
import { searchComics } from '@services/ComicService';
import { signOut } from '@services/AuthService';
import style from './style.module.scss';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isShowUserSubMenu, setIsShowUserSubMenu] = useState(false);
    const [isShowGenresSubMenu, setIsShowGenresSubMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const location = useLocation();

    const { setIsAuthFormOpen } = useContext(AuthFormContext);
    const { myInfo, setMyInfo, genres } = useContext(StoreContext);
    const { handleRandomComic } = useContext(ComicDetailContext);
    const { toast } = useContext(ToastContext);

    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    const handleSearchFocus = () => {
        setIsSearchFocused(true);
    };

    const handleSearchBlur = () => {
        setTimeout(() => {
            setIsSearchFocused(false);
        }, 200);
    };

    const handleOpenAuthForm = () => {
        if (!myInfo) {
            setIsAuthFormOpen(true);
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

    const handleGenreClick = (genre) => {
        navigate(`/filter-comics?genres=${genre.id}`);
    };

    const handleFilterClick = () => {
        navigate('/filter-comics');
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        if (debouncedSearch.trim() === '') {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        searchComics(debouncedSearch)
            .then((res) => {
                setSearchResults(res.data.data);
            })
            .catch((err) => {
                toast.error('Có lỗi xảy ra khi tìm kiếm');
                console.log(err);
            })
            .finally(() => {
                setIsSearching(false);
            });
    }, [debouncedSearch]);

    const isReadComicPage = location.pathname.startsWith('/read-comic');

    return (
        <header
            className={`${style.header} ${isScrolled ? style.scrolled : ''} ${
                isReadComicPage ? style.readComic : ''
            }`}
        >
            <div className={style.container}>
                <a href='/' className={style.headerLogo}>
                    <img src={Logo} alt='Trang Chủ' />
                </a>
                <div className={style.headerFilterContainer}>
                    <div className={style.headerFilter}>
                        <label htmlFor='search-input'>
                            {isSearching ? (
                                <TinyLoading size={20} />
                            ) : (
                                <SearchOutlined />
                            )}
                        </label>
                        <input
                            id='search-input'
                            type='text'
                            autoComplete='off'
                            placeholder='Tìm truyện...'
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={handleSearchFocus}
                            onBlur={handleSearchBlur}
                        />
                        <div
                            className={style.filterIcon}
                            onClick={handleFilterClick}
                        >
                            <FilterOutlined />
                        </div>
                    </div>
                    {isSearchFocused && (
                        <div className={style.searchComicsContainer}>
                            <div className={style.backgroundSearch}></div>
                            <div className={style.comicsList}>
                                {isSearching ? (
                                    <div className={style.loadingContainer}>
                                        <CustomLoading
                                            text='Đang tìm kiếm...'
                                            sizeBar={5}
                                        />
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    searchResults.map((comic) => (
                                        <Comic key={comic.id} comic={comic} />
                                    ))
                                ) : searchQuery.trim() !== '' ? (
                                    <span>Không tìm thấy kết quả phù hợp</span>
                                ) : (
                                    <span>
                                        Nhập tên truyện hoặc tên tác giả cần
                                        tìm...
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
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
                                                onClick={() =>
                                                    handleGenreClick(genre)
                                                }
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
                    <div
                        className={style.mobileSearchIcon}
                        onClick={handleFilterClick}
                    >
                        <SearchOutlined />
                    </div>
                    <div
                        className={style.luckyIcon}
                        onClick={handleRandomComic}
                    >
                        <StarFilled />
                    </div>
                    <div
                        className={style.userIcon}
                        onClick={handleOpenAuthForm}
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
