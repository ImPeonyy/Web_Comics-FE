import Comic from '@components/Comic/Comic';
import style from './style.module.scss';

const ComicContainer = ({ comics, onDelete, deletingComicId, isHistory }) => {
    if (isHistory) {
        return (
            <div className={style.comicContainer}>
                {comics.map((item) => (
                    <div className={style.comicItem} key={item.id}>
                        <Comic
                            comic={item.comic}
                            titleStyle={{
                                fontSize: 'smaller'
                            }}
                            chapterStyle={{
                                fontSize: '11px'
                            }}
                            onDelete={onDelete}
                            isLoading={deletingComicId === item.id}
                            historyChapter={item.chapter}
                        />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={style.comicContainer}>
            {comics.map((item) => (
                <div className={style.comicItem} key={item.id}>
                    <Comic
                        comic={item}
                        titleStyle={{
                            fontSize: 'smaller'
                        }}
                        chapterStyle={{
                            fontSize: '11px'
                        }}
                        onDelete={onDelete}
                        isLoading={deletingComicId === item.id}
                    />
                </div>
            ))}
        </div>
    );
};

export default ComicContainer;
