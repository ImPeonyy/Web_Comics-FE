import { lazy } from 'react';

const publicRouters = [
    {
        path: '/',
        component: lazy(() => import('@pages/HomePage')),
        isPrivate: false
    },
    {
        path: '/read-comic/:comicSlug/:chapterSlug',
        component: lazy(() => import('@pages/ReadComicPage')),
        isPrivate: false
    },
    {
        path: '/filter-comics',
        component: lazy(() => import('@pages/FilterComicsPage')),
        isPrivate: false
    }
];

const privateRouters = [
    {
        path: '/my-info',
        component: lazy(() => import('@pages/MyInfoPage')),
        isPrivate: true
    },
    {
        path: '/history',
        component: lazy(() => import('@pages/HistoryPage')),
        isPrivate: true
    },
    {
        path: '/favorites',
        component: lazy(() => import('@pages/FavoritesPage')),
        isPrivate: true
    }
];

export { publicRouters, privateRouters };
