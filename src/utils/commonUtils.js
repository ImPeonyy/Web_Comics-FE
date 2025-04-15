import { getChaptersHistory } from '@services/FavHisService';

const calcView = (statistics) => {
    const view = statistics.reduce((acc, curr) => {
        return acc + curr.view_count;
    }, 0);
    return view;
};

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

export { calcView, chapterStatus };
