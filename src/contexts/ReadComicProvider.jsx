import { createContext, useEffect, useState } from 'react';

import { addHistory } from '@services/FavHisService';
import { getChapterImages } from '@services/ComicService';

export const ReadComicContext = createContext();

export const ReadComicProvider = ({ children }) => {
    const [chapter, setChapter] = useState(null);
    const [chapterImages, setChapterImages] = useState([]);

    useEffect(() => {
        if (chapter) {
            getChapterImages(chapter.id)
                .then((res) => {
                    setChapterImages(res.data);
                    addHistory(chapter.comic_id, chapter.id)
                        .then(() => {
                            console.log('History added');
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [chapter]);

    return (
        <ReadComicContext.Provider
            value={{
                chapter,
                setChapter,
                chapterImages
            }}
        >
            {children}
        </ReadComicContext.Provider>
    );
};
