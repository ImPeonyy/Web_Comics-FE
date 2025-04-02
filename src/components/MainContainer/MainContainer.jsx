import style from './style.module.scss';
import ComicList from './ComicList/ComicList.jsx';

const MainContainer = () => {
    return (
        <div>
            <ComicList title={'Manga'}/>
        </div>
    );
};

export default MainContainer;
