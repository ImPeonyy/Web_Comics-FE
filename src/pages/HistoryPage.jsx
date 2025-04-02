import Footer from '@components/Common/Footer/Footer';
import Header from '@components/Common/Header/Header';
import History from '@components/History/History';
import MainLayout from '@layouts/MainLayout/MainLayout';

const HistoryPage = () => {
    return (
        <MainLayout>
            <Header />
            <History />
            <Footer />
        </MainLayout>
    );
};

export default HistoryPage;
