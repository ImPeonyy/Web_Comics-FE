import Dashboard from '@components/Admin/Dashboard/Dashboard';
import { DashboardProvider } from '@contexts/DashboardProvider';
import Footer from '@components/Common/Footer/Footer.jsx';
import Header from '@components/Common/Header/Header.jsx';
import MainLayout from '@layouts/MainLayout/MainLayout.jsx';

const DashboardPage = () => {
    return (
        <DashboardProvider>
            <MainLayout>
                <Header />
                <Dashboard />
                <Footer />
            </MainLayout>
        </DashboardProvider>
    );
};

export default DashboardPage;
