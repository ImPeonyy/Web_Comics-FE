import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    ArrowUpOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import { deslugify, slugify } from '@utils/slugifyUtils';
import { getChapterList, getComicById } from '@services/ComicService';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ComicDetailContext } from '@contexts/ComicDetailProvider';
import LoadingComponent from '@components/Loading/LoadingComponent/LoadingComponent';
import { ReadComicContext } from '@contexts/ReadComicProvider';
import { calcView } from '@utils/commonUtils';
import { increaseView } from '@services/StatisticService';
import style from './style.module.scss';

const ReadComic = () => {
    const { comicSlug, chapterSlug } = useParams();
    const navigate = useNavigate();
    const { chapter, chapterImages, setChapter } = useContext(ReadComicContext);
    const { setIsComicDetailOpen, setComicDetail } =
        useContext(ComicDetailContext);
    const [images, setImages] = useState([]);
    const [loadingImages, setLoadingImages] = useState({});
    const [comic, setComic] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showChapterList, setShowChapterList] = useState(false);
    const [chapters, setChapters] = useState([]);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const chapterListRef = useRef(null);
    const containerRefs = useRef([]); // Lưu trữ refs cho các container

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                chapterListRef.current &&
                !chapterListRef.current.contains(event.target)
            ) {
                setShowChapterList(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        // Khởi tạo images với visible: false và loadingImages với tất cả là true
        setImages(chapterImages.map((img) => ({ ...img, visible: false })));
        setLoadingImages(
            chapterImages.reduce((acc, img) => ({ ...acc, [img.id]: true }), {})
        );
        window.scrollTo({ top: 0 });
    }, [chapterImages]);

    useEffect(() => {
        if (comicSlug && chapterSlug) {
            setIsLoading(true);
            const comicId = deslugify(comicSlug);
            getComicById(comicId)
                .then((res) => {
                    const data = res.data.data;
                    data.view = calcView(data.statistics);
                    data.isFavorite =
                        data.favorites && data.favorites.length > 0;
                    setComic(data);
                })
                .catch((err) => console.log(err));
            getChapterList(comicId)
                .then((res) => {
                    setChapters(res.data);
                    const chapterId = deslugify(chapterSlug);
                    const foundChapter = res.data.find(
                        (chapter) => chapter.id === chapterId
                    );
                    if (foundChapter) setChapter(foundChapter);
                })
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false));
        }
    }, [comicSlug, chapterSlug]);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // IntersectionObserver để kiểm soát render ảnh
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = containerRefs.current.indexOf(
                            entry.target
                        );
                        if (index !== -1 && !images[index].visible) {
                            setImages((prevImages) =>
                                prevImages.map((img, i) =>
                                    i === index
                                        ? { ...img, visible: true }
                                        : img
                                )
                            );
                            // Log khi ảnh cuối xuất hiện
                            if (index === images.length - 1) {
                                increaseView(comic.id).catch((err) =>
                                    console.log(err)
                                );
                            }
                        }
                    }
                });
            },
            { threshold: 0.1, rootMargin: '100px' } // Kích hoạt sớm 100px
        );

        containerRefs.current.forEach((container) => {
            if (container) observer.observe(container);
        });

        return () => {
            containerRefs.current.forEach((container) => {
                if (container) observer.unobserve(container);
            });
        };
    }, [images]);

    const handleChapterClick = (selectedChapter) => {
        setChapter(selectedChapter);
        setShowChapterList(false);
        navigate(
            `/read-comic/${comicSlug}/${slugify(
                selectedChapter.title,
                selectedChapter.id
            )}`
        );
        window.scrollTo({ top: 0 });
    };

    const handlePrevChapter = () => {
        const currentIndex = chapters.findIndex(
            (chap) => chap.id === chapter.id
        );
        if (currentIndex > 0) handleChapterClick(chapters[currentIndex - 1]);
    };

    const handleNextChapter = () => {
        const currentIndex = chapters.findIndex(
            (chap) => chap.id === chapter.id
        );
        if (currentIndex < chapters.length - 1)
            handleChapterClick(chapters[currentIndex + 1]);
    };

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading || !chapter || !comic) {
        return (
            <div className={style.loadingContainer}>
                <LoadingComponent />
            </div>
        );
    }

    const handleBackToComicClick = () => {
        setIsComicDetailOpen(true);
        setComicDetail(comic);
    };

    const currentIndex = chapters.findIndex((chap) => chap.id === chapter.id);
    const isFirstChapter = currentIndex === 0;
    const isLastChapter = currentIndex === chapters.length - 1;

    const handleImageLoad = (imageId) => {
        setLoadingImages((prev) => ({ ...prev, [imageId]: false }));
    };

    return (
        <div className={style.container}>
            <div className={style.chapterHeader}>
                <div
                    className={style.backToComic}
                    onClick={handleBackToComicClick}
                >
                    <span>
                        <ArrowLeftOutlined />
                    </span>
                    <span>{comic.title}</span>
                </div>
                <div className={style.chapterTitle}>
                    <span>{comic.title}</span>-<span>{chapter.title}</span>
                </div>
                <div className={style.actions}>
                    <button
                        className={style.actionButton}
                        disabled={isFirstChapter}
                        onClick={handlePrevChapter}
                    >
                        <ArrowLeftOutlined />
                        <span>Chương trước</span>
                    </button>
                    <div
                        className={style.listChapter}
                        onClick={() => setShowChapterList(!showChapterList)}
                        ref={chapterListRef}
                    >
                        <UnorderedListOutlined />
                        <span>{chapter.title}</span>
                        {showChapterList && (
                            <div className={style.chapterList}>
                                {chapters.map((chap) => (
                                    <div
                                        key={chap.id}
                                        className={`${style.chapterItem} ${
                                            chap.id === chapter.id
                                                ? style.active
                                                : ''
                                        }`}
                                        onClick={() => handleChapterClick(chap)}
                                    >
                                        {chap.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        className={style.actionButton}
                        disabled={isLastChapter}
                        onClick={handleNextChapter}
                    >
                        <span>Chương tiếp theo</span>
                        <ArrowRightOutlined />
                    </button>
                </div>
            </div>
            <div className={style.chapterImages}>
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className={style.imageContainer}
                        ref={(el) => (containerRefs.current[index] = el)}
                        style={{ minHeight: '200px', background: '#f0f0f0' }}
                    >
                        {image.visible && (
                            <>
                                {loadingImages[image.id] && (
                                    <div className={style.imageLoading}>
                                        <LoadingComponent />
                                    </div>
                                )}
                                <img
                                    src={image.image_url}
                                    alt={image.title}
                                    className={style.image}
                                    onLoad={() => handleImageLoad(image.id)}
                                    style={{
                                        display: loadingImages[image.id]
                                            ? 'none'
                                            : 'block'
                                    }}
                                />
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div className={style.chapterFooter}>
                <div className={style.actions}>
                    <button
                        className={style.actionButton}
                        disabled={isFirstChapter}
                        onClick={handlePrevChapter}
                    >
                        <ArrowLeftOutlined />
                        <span>Chương trước</span>
                    </button>
                    <button
                        className={style.actionButton}
                        disabled={isLastChapter}
                        onClick={handleNextChapter}
                    >
                        <span>Chương tiếp theo</span>
                        <ArrowRightOutlined />
                    </button>
                </div>
            </div>
            {showBackToTop && (
                <div className={style.backToTop} onClick={handleBackToTop}>
                    <ArrowUpOutlined />
                </div>
            )}
        </div>
    );
};

export default ReadComic;
