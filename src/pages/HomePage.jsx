import Footer from '@components/Common/Footer/Footer.jsx';
import Header from '@components/Common/Header/Header.jsx';
import { HomePageProvider } from '@contexts/HomePageProvider';
import MainContainer from '@components/MainContainer/MainContainer';
import MainLayout from '@layouts/MainLayout/MainLayout.jsx';
import PopularFeatures from '@components/PopularFeatures/PopularFeatures.jsx';
import RCMComics from '@components/RecommendComics/RCMComics.jsx';

export const HomePage = () => {
    return (
        <HomePageProvider>
            <MainLayout>
                <Header />
                <RCMComics />
                <PopularFeatures />
                {/* <MainContainer /> */}
                <Footer />
            </MainLayout>
        </HomePageProvider>
    );
};

export default HomePage;
