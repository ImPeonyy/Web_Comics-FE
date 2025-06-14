import Footer from '@components/Common/Footer/Footer.jsx';
import Header from '@components/Common/Header/Header.jsx';
import { LevelsProvider } from '@contexts/LevelsProvider';
import MainLayout from '@layouts/MainLayout/MainLayout.jsx';
import MyInfo from '@components/MyInfo/MyInfo';

export const MyInfoPage = () => {
    return (
        <LevelsProvider>
            <MainLayout>
                <Header />
                <MyInfo />
                <Footer />
            </MainLayout>
        </LevelsProvider>
    );
};

export default MyInfoPage;
