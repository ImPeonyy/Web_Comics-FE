import Footer from '@components/Common/Footer/Footer.jsx';
import Header from '@components/Common/Header/Header.jsx';
import MainLayout from '@layouts/MainLayout/MainLayout.jsx';
import MyInfo from '@components/MyInfo/MyInfo';

export const MyInfoPage = () => {
    return (
        <MainLayout>
            <Header />
            <MyInfo />
            <Footer />
        </MainLayout>
    );
};

export default MyInfoPage;
