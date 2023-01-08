import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AllRoute } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';
function App() {
    const loading = useSelector((state) => state.headerState.user.isLoading);

    return (
        <>
            {loading && <Loading />}
            <BrowserRouter>
                <Routes>
                    {AllRoute.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (!route.layout) {
                            Layout = Fragment;
                        } else if (route.layout) {
                            Layout = route.layout;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
