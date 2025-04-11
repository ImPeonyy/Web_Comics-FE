import { createContext, useEffect, useState } from 'react';

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
