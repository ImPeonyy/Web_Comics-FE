import Comic from '@components/Comic/Comic';
import style from './style.module.scss';

const ComicContainer = ({ comics }) => {
    return (
        <div className={style.comicContainer}>
            {comics.map((comic) => (
                <div className={style.comicItem} key={comic.id}>
                    <Comic
                        comic={comic}
                        titleStyle={{
                            fontSize: 'smaller'
                        }}
                        chapterStyle={{
                            fontSize: '10px'
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default ComicContainer;
