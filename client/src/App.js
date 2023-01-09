import { Fragment } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserRoute, AdminRoute } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';
function App() {
    const loading = useSelector((state) => state.headerState.user.isLoading);
    const role = useSelector((state) => state.headerState.user.role);
    console.log(role);
    return (
        <>
            {loading && <Loading />}
            <BrowserRouter>
                <Routes>
                    {UserRoute.map((route, index) => {
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
                    {AdminRoute.map((route, index) => {
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
                                    role === 1 ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Navigate to="/" />
                                    )
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
