import style from './style.module.scss';

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
    const renderPagination = () => {
        if (lastPage <= 1) return null;

        const pages = [];

        // Nút Previous
        pages.push(
            <div
                key='prev'
                className={`${style.pageItem} ${
                    currentPage === 1 ? style.disabled : ''
                }`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &laquo;
            </div>
        );

        // Các nút trang
        for (let i = 1; i <= lastPage; i++) {
            if (
                i === 1 ||
                i === lastPage ||
                (i >= currentPage - 2 && i <= currentPage + 2)
            ) {
                pages.push(
                    <div
                        key={i}
                        className={`${style.pageItem} ${
                            currentPage === i ? style.active : ''
                        }`}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </div>
                );
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                pages.push(
                    <span key={i} className={style.pageItem}>
                        ...
                    </span>
                );
            }
        }

        // Nút Next
        pages.push(
            <div
                key='next'
                className={`${style.pageItem} ${
                    currentPage === lastPage ? style.disabled : ''
                }`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
            >
                &raquo;
            </div>
        );

        return pages;
    };

    return lastPage > 1 ? (
        <div className={style.pagination}>{renderPagination()}</div>
    ) : null;
};

export default Pagination;
