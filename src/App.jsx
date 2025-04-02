import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthForm from '@components/AuthForm/AuthForm';
import { AuthFormProvider } from '@/contexts/AuthFormProvider';
import { LevelsProvider } from '@/contexts/LevelsProvider';
import { StoreProvider } from '@/contexts/StoreProvider';
import { ToastProvider } from '@/contexts/ToastProvider';
import { publicRouters } from './routers.js';

function App() {
    return (
        <ToastProvider>
            <StoreProvider>
                <LevelsProvider>
                    <AuthFormProvider>
                        <AuthForm />
                        <BrowserRouter>
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
                            </Routes>
                        </BrowserRouter>
                    </AuthFormProvider>
                </LevelsProvider>
            </StoreProvider>
        </ToastProvider>
    );
}

export default App;
