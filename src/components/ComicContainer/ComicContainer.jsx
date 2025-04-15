import Comic from '@components/Comic/Comic';
import style from './style.module.scss';

const ComicContainer = ({ comics, onDelete, deletingComicId }) => {
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
                        onDelete={onDelete}
                        isLoading={deletingComicId === comic.id}
                        chapter={comic.chapter}
                    />
                </div>
            ))}
        </div>
    );
};

export default ComicContainer;
