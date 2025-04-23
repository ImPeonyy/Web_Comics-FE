import { getChaptersHistory } from '@services/FavHisService';

let chaptersHistory = [];

getChaptersHistory()
    .then((res) => {
        chaptersHistory = res.data.history;
    })
    .catch((err) => {
        console.log('API error:', err);
    });

const chapterStatus = (chapter) => {
    const chapterHistory = chaptersHistory.find(
        (item) => item.chapter_id === chapter.id
    );
    return chapterHistory ? true : false;
};

export { chapterStatus };
