import Footer from '@components/Common/Footer/Footer.jsx';
import Header from '@components/Common/Header/Header.jsx';
import MainLayout from '@layouts/MainLayout/MainLayout.jsx';
import ReadComic from '@components/ReadComic/ReadComic.jsx';

export const ReadComicPage = () => {
    return (
        <MainLayout>
            <Header />
            <ReadComic />
            <Footer />
        </MainLayout>
    );
};

export default ReadComicPage;
