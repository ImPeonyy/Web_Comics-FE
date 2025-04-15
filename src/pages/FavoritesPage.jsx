import Favorite from '@components/Favorites/Favorites';
import { FavoritesProvider } from '@contexts/FavoritesProvider';
import Footer from '@components/Common/Footer/Footer.jsx';
import Header from '@components/Common/Header/Header.jsx';
import MainLayout from '@layouts/MainLayout/MainLayout.jsx';

const FavoritesPage = () => {
    return (
        <FavoritesProvider>
            <MainLayout>
                <Header />
                <Favorite />
                <Footer />
            </MainLayout>
        </FavoritesProvider>
    );
};

export default FavoritesPage;
