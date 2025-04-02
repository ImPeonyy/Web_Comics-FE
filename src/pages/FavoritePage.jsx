import Favorite from '@components/Favorite/Favorite';
import Footer from '@components/Common/Footer/Footer.jsx';
import Header from '@components/Common/Header/Header.jsx';
import MainLayout from '@layouts/MainLayout/MainLayout.jsx';

const FavoritePage = () => {
    return (
        <MainLayout>
            <Header />
            <Favorite />
            <Footer />
        </MainLayout>
    );
};

export default FavoritePage;
