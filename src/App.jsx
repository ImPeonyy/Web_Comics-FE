import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { privateRouters, publicRouters } from './routers.js';

import AuthForm from '@components/AuthForm/AuthForm';
import { AuthFormProvider } from '@/contexts/AuthFormProvider';
import ComicDetail from '@components/ComicDetail/ComicDetail';
import { ComicDetailProvider } from '@/contexts/ComicDetailProvider';
import Cookies from 'js-cookie';
import { LevelsProvider } from '@/contexts/LevelsProvider';
import { ReadComicProvider } from '@/contexts/ReadComicProvider';
import { StoreProvider } from '@/contexts/StoreProvider';
import { ToastProvider } from '@/contexts/ToastProvider';

function App() {
    const isAuthenticated = !!Cookies.get('token');

    return (
        <ToastProvider>
            <StoreProvider>
                <LevelsProvider>
                    <AuthFormProvider>
                        <AuthForm />
                        <BrowserRouter>
                            <ComicDetailProvider>
                                <ComicDetail />
                                <ReadComicProvider>
                                    <Routes>
                                        {publicRouters.map((item, index) => {
                                            return (
                                                <Route
                                                    path={item.path}
                                                    element={<item.component />}
                                                    key={index}
                                                />
                                            );
                                        })}
                                        {privateRouters.map((item, index) => {
                                            return (
                                                <Route
                                                    path={item.path}
                                                    element={
                                                        item.isPrivate &&
                                                        isAuthenticated ? (
                                                            <item.component />
                                                        ) : (
                                                            <Navigate
                                                                to='/'
                                                                replace
                                                            />
                                                        )
                                                    }
                                                    key={`private-${index}`}
                                                />
                                            );
                                        })}
                                    </Routes>
                                </ReadComicProvider>
                            </ComicDetailProvider>
                        </BrowserRouter>
                    </AuthFormProvider>
                </LevelsProvider>
            </StoreProvider>
        </ToastProvider>
    );
}

export default App;
