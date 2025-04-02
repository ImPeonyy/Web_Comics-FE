import { lazy } from 'react'

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
    }
];

export {publicRouters}