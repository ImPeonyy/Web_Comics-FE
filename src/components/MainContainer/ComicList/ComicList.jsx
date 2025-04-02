import Comic from '@components/Comic/Comic';
import style from './style.module.scss';

const ComicList = ({ title }) => {
    return (
        <section>
            <div className={style.container}>
                <div className={style.listTitle}>
                    <span>{title}</span>
                    <a href=''>
                        <ion-icon name='arrow-forward-sharp'></ion-icon>
                    </a>
                </div>
                <div className={style.listComics}>
                    <Comic
                        titleStyle={{
                            fontSize: 'medium'
                        }}
                        chapterStyle={{
                            fontSize: '12px'
                        }}
                    />
                    <Comic
                        titleStyle={{
                            fontSize: 'medium'
                        }}
                        chapterStyle={{
                            fontSize: '12px'
                        }}
                    />
                    <Comic
                        titleStyle={{
                            fontSize: 'medium'
                        }}
                        chapterStyle={{
                            fontSize: '12px'
                        }}
                    />
                    <Comic
                        titleStyle={{
                            fontSize: 'medium'
                        }}
                        chapterStyle={{
                            fontSize: '12px'
                        }}
                    />
                    <Comic
                        titleStyle={{
                            fontSize: 'medium'
                        }}
                        chapterStyle={{
                            fontSize: '12px'
                        }}
                    />
                    <Comic
                        titleStyle={{
                            fontSize: 'medium'
                        }}
                        chapterStyle={{
                            fontSize: '12px'
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default ComicList;
