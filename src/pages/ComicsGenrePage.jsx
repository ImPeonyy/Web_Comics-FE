import ComicsGenre from '@components/Genres/ComicsGenre/ComicsGenre';
import { ComicsGenreProvider } from '@contexts/ComicsGenreProvider';
import Footer from '@components/Common/Footer/Footer.jsx';
import Header from '@components/Common/Header/Header.jsx';
import MainLayout from '@layouts/MainLayout/MainLayout.jsx';

const ComicsGenrePage = () => {
    return (
        <ComicsGenreProvider>
            <MainLayout>
                <Header />
                <ComicsGenre />
                <Footer />
            </MainLayout>
        </ComicsGenreProvider>
    );
};

export default ComicsGenrePage;
