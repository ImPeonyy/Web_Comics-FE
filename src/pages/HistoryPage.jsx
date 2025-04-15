import Footer from '@components/Common/Footer/Footer';
import Header from '@components/Common/Header/Header';
import History from '@components/History/History';
import { HistoryProvider } from '@contexts/HistoryProvider';
import MainLayout from '@layouts/MainLayout/MainLayout';

const HistoryPage = () => {
    return (
        <HistoryProvider>
            <MainLayout>
                <Header />
                <History />
                <Footer />
            </MainLayout>
        </HistoryProvider>
    );
};

export default HistoryPage;
