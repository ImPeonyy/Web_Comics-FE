import { lazy } from 'react';

const publicRouters = [
    {
        path: '/',
        component: lazy(() => import('@pages/HomePage'))
    },
    {
        path: '/my-info',
        component: lazy(() => import('@pages/MyInfoPage'))
    },
    {
        path: '/history',
        component: lazy(() => import('@pages/HistoryPage'))
    },
    {
        path: '/favorite',
        component: lazy(() => import('@pages/FavoritePage'))
    },
    {
        path: '/read-comic/:comicSlug/:chapterSlug',
        component: lazy(() => import('@pages/ReadComicPage'))
    },
    {
        path: '/genre/:genreSlug',
        component: lazy(() => import('@pages/ComicsGenrePage'))
    },
    {
        path: '/genre/:genreSlug?page=:page',
        component: lazy(() => import('@pages/ComicsGenrePage'))
    },
    {
        path: '/filter-comics',
        component: lazy(() => import('@pages/FilterComicsPage'))
    }
];

export { publicRouters };
