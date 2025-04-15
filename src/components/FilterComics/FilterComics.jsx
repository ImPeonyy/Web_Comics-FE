import {
    DownOutlined,
    FilterOutlined,
    LoadingOutlined,
    StarFilled
} from '@ant-design/icons';
import { useContext, useEffect, useRef, useState } from 'react';

import ComicContainer from '@components/ComicContainer/ComicContainer';
import { ComicDetailContext } from '@contexts/ComicDetailProvider';
import EmptyContent from '@components/EmptyContent/EmptyContent';
import { FilterComicsContext } from '@contexts/FilterComicsProvider';
import LoadingPage from '@components/Loading/LoadingPage/LoadingPage';
import { StoreContext } from '@contexts/StoreProvider';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';

const FilterComics = () => {
    const { comics, sortOptions, statusOptions, isLoading } =
        useContext(FilterComicsContext);
    const { genres } = useContext(StoreContext);
    const { handleRandomComic, isRandomComicLoading } =
        useContext(ComicDetailContext);

    const [openSubmenu, setOpenSubmenu] = useState('');
    const [selectedSort, setSelectedSort] = useState(sortOptions[0].label);
    const [selectedGenres, setSelectedGenres] = useState([
        { id: 'default', name: 'Tất cả' }
    ]);
    const [selectedStatus, setSelectedStatus] = useState(
        statusOptions[0].label
    );

    const containerRef = useRef(null);

    const navigate = useNavigate();

    const isOptionSelected = (option, filterType) => {
        switch (filterType) {
            case 'sort':
                return selectedSort === option;
            case 'genre':
                return selectedGenres.some((genre) => genre.id === option.id);
            case 'status':
                return selectedStatus === option;
            default:
                return false;
        }
    };

    const getDisplayText = (filterType) => {
        switch (filterType) {
            case 'genre':
                if (selectedGenres.some((genre) => genre.id === 'default'))
                    return 'Tất cả';
                if (selectedGenres.length <= 2)
                    return selectedGenres.map((genre) => genre.name).join(', ');
                return `${selectedGenres.length} thể loại`;
            default:
                return '';
        }
    };

    const handleFilterClick = (filterType) => {
        setOpenSubmenu(openSubmenu === filterType ? '' : filterType);
    };

    const handleOptionClick = (option, filterType, e) => {
        e.stopPropagation();
        switch (filterType) {
            case 'sort':
                setSelectedSort(option);
                setOpenSubmenu('');
                break;
            case 'genre':
                if (option.name === 'Tất cả') {
                    setSelectedGenres([{ id: 'default', name: 'Tất cả' }]);
                } else {
                    const newSelectedGenres = selectedGenres.some(
                        (genre) => genre.id === option.id
                    )
                        ? selectedGenres.filter(
                              (genre) => genre.id !== option.id
                          )
                        : [
                              ...selectedGenres.filter(
                                  (genre) => genre.id !== 'default'
                              ),
                              option
                          ];

                    if (newSelectedGenres.length === 0) {
                        setSelectedGenres([{ id: 'default', name: 'Tất cả' }]);
                    } else {
                        setSelectedGenres(newSelectedGenres);
                    }
                }
                break;
            case 'status':
                setSelectedStatus(option);
                setOpenSubmenu('');
                break;
            default:
                break;
        }
    };

    const handleSearchClick = () => {
        const searchInput = document.getElementsByName('searchInput')[0];
        const sortInput = sortOptions.find(
            (option) => option.label === selectedSort
        );
        const statusInput = statusOptions.find(
            (option) => option.label === selectedStatus
        );

        let queryParams = [];

        // Chỉ thêm keyword nếu có giá trị
        if (searchInput.value) {
            queryParams.push(`keyword=${searchInput.value}`);
        }

        // Chỉ thêm sort nếu không phải giá trị mặc định
        if (sortInput.value !== sortOptions[0].value) {
            queryParams.push(`sortBy=${sortInput.value}`);
        }

        // Chỉ thêm status nếu không phải giá trị mặc định
        if (statusInput.value !== statusOptions[0].value) {
            queryParams.push(`status=${statusInput.value}`);
        }

        // Chỉ thêm genres nếu không phải giá trị mặc định
        if (!selectedGenres.some((genre) => genre.id === 'default')) {
            const genreIds = selectedGenres.map((genre) => genre.id).join(',');
            queryParams.push(`genres=${genreIds}`);
        }

        const queryString =
            queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        navigate(`/filter-comics${queryString}`);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openSubmenu) {
                const filterButtons = document.querySelectorAll(
                    `.${style.filterItem}`
                );
                const isClickOnFilterButton = Array.from(filterButtons).some(
                    (button) => button.contains(event.target)
                );

                if (
                    containerRef.current &&
                    !containerRef.current.contains(event.target) &&
                    !isClickOnFilterButton
                ) {
                    setOpenSubmenu('');
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openSubmenu]);

    return (
        <div className={style.container} ref={containerRef}>
            <div className={style.filterComicsHeader}>
                <h1>Tìm Truyện</h1>
                <div className={style.filterActions}>
                    <div
                        className={[style.actionItem, style.searchInput].join(
                            ' '
                        )}
                    >
                        <input
                            name='searchInput'
                            type='text'
                            placeholder='Tìm truyện...'
                        />
                    </div>
                    <div
                        className={[
                            style.actionItem,
                            style.filterItem,
                            openSubmenu === 'sort' ? style.active : ''
                        ].join(' ')}
                        onClick={() => handleFilterClick('sort')}
                    >
                        <span>{selectedSort}</span>
                        <span>
                            <DownOutlined />
                        </span>
                        <div
                            className={[
                                style.submenu,
                                openSubmenu === 'sort' ? style.show : ''
                            ].join(' ')}
                        >
                            {sortOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className={style.submenuItem}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOptionClick(
                                            option.label,
                                            'sort',
                                            e
                                        );
                                    }}
                                >
                                    <div
                                        className={[
                                            style.checkbox,
                                            isOptionSelected(
                                                option.label,
                                                'sort'
                                            )
                                                ? style.checked
                                                : ''
                                        ].join(' ')}
                                    />
                                    <span>{option.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className={[
                            style.actionItem,
                            style.filterItem,
                            openSubmenu === 'genre' ? style.active : ''
                        ].join(' ')}
                        onClick={() => handleFilterClick('genre')}
                    >
                        <span>
                            {getDisplayText('genre') || selectedGenres[0].name}
                        </span>
                        <span>
                            <DownOutlined />
                        </span>
                        <div
                            className={[
                                style.submenu,
                                style.genreSubmenu,
                                openSubmenu === 'genre' ? style.show : ''
                            ].join(' ')}
                        >
                            <div
                                className={style.submenuItem}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOptionClick(
                                        { id: 'default', name: 'Tất cả' },
                                        'genre',
                                        e
                                    );
                                }}
                            >
                                <div
                                    className={[
                                        style.checkbox,
                                        isOptionSelected(
                                            { id: 'default', name: 'Tất cả' },
                                            'genre'
                                        )
                                            ? style.checked
                                            : ''
                                    ].join(' ')}
                                />
                                <span>Tất cả</span>
                            </div>
                            {genres.map((option, index) => (
                                <div
                                    key={index}
                                    className={style.submenuItem}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOptionClick(option, 'genre', e);
                                    }}
                                >
                                    <div
                                        className={[
                                            style.checkbox,
                                            isOptionSelected(option, 'genre')
                                                ? style.checked
                                                : ''
                                        ].join(' ')}
                                    />
                                    <span>{option.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className={[
                            style.actionItem,
                            style.filterItem,
                            openSubmenu === 'status' ? style.active : ''
                        ].join(' ')}
                        onClick={() => handleFilterClick('status')}
                    >
                        <span>{selectedStatus}</span>
                        <span>
                            <DownOutlined />
                        </span>
                        <div
                            className={[
                                style.submenu,
                                openSubmenu === 'status' ? style.show : ''
                            ].join(' ')}
                        >
                            {statusOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className={style.submenuItem}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOptionClick(
                                            option.label,
                                            'status',
                                            e
                                        );
                                    }}
                                >
                                    <div
                                        className={[
                                            style.checkbox,
                                            isOptionSelected(
                                                option.label,
                                                'status'
                                            )
                                                ? style.checked
                                                : ''
                                        ].join(' ')}
                                    />
                                    <span>{option.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className={[style.actionItem, style.searchItem].join(
                            ' '
                        )}
                        onClick={handleSearchClick}
                    >
                        <span>
                            <FilterOutlined />
                        </span>
                        <span>Tìm Kiếm</span>
                    </div>
                    <div
                        className={[style.actionItem, style.luckyItem].join(
                            ' '
                        )}
                        onClick={handleRandomComic}
                    >
                        <span>
                            {isRandomComicLoading ? (
                                <LoadingOutlined />
                            ) : (
                                <StarFilled />
                            )}
                        </span>
                        <span>I'm Felling Lucky</span>
                    </div>
                </div>
            </div>
            {isLoading ? (
                <div className={style.loadingContainer}>
                    <LoadingPage />
                </div>
            ) : comics.length > 0 ? (
                <ComicContainer comics={comics} />
            ) : (
                <div className={style.emptyContent}>
                    <EmptyContent content='Không tìm thấy kết quả' />
                </div>
            )}
        </div>
    );
};

export default FilterComics;
