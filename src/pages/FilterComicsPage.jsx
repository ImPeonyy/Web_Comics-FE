import FilterComics from '@components/FilterComics/FilterComics';
import { FilterComicsProvider } from '@contexts/FilterComicsProvider';
import Footer from '@components/Common/Footer/Footer.jsx';
import Header from '@components/Common/Header/Header.jsx';
import MainLayout from '@layouts/MainLayout/MainLayout.jsx';

const FilterComicsPage = () => {
    return (
        <FilterComicsProvider>
            <MainLayout>
                <Header />
                <FilterComics />
                <Footer />
            </MainLayout>
        </FilterComicsProvider>
    );
};

export default FilterComicsPage;
