import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';

const Genre = ({ title, genre, onClick }) => {
    const navigate = useNavigate();

    const type = () => {
        switch (title) {
            case 'Ongoing':
                return 'ongoing';
            case 'Completed':
                return 'completed';
            default:
                return 'genre';
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
        onClick(e);
        if (genre) {
            navigate(`/filter-comics?genres=${genre.id}`);
        } else {
            navigate(`/filter-comics?status=${title}`);
        }
    };

    return (
        <div className={`${style[type()]}`} onClick={handleClick}>
            {title}
        </div>
    );
};

export default Genre;
