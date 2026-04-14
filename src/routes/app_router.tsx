import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BareLayout from '../layouts/bare/bare.layout';
import Loader from '../components/loader';
import { ErrorBoundary } from 'react-error-boundary';
import InternalServerErrorPage from '../pages/500/500';
import useRoutes, { type RouteType } from '../hooks/user_route';

const NotFoundPage = lazy(() => import('../pages/404/404'));

const renderRoute = (routes: RouteType[]) =>
    routes.map((r) => {
        //debugger
        const routeOptions = r.index ? { index: true } : { path: r.path };

        const Element = r.element;
        return (
            <Route
                key={routeOptions.path}
                path={routeOptions.path}
                element={
                    <Suspense fallback={<Loader />}>
                        <Element />
                    </Suspense>
                }>
                {r.children?.map(({ path, element: ChildElement, ...rest }) => {
                    return rest.index ? (
                        <Route
                            key={`${routeOptions.path}/${path}`}
                            index
                            element={
                                <Suspense fallback={<Loader />}>
                                    <ChildElement />
                                </Suspense>
                            }
                        />
                    ) : (
                        <Route
                            key={`${routeOptions.path}/${path}`}
                            element={
                                <Suspense fallback={<Loader />}>
                                    <ChildElement />
                                </Suspense>
                            }>
                            {rest.children && renderRoute(rest.children)}
                        </Route>
                    );
                })}
            </Route>
        );
    });

const AppRouters: React.FC = () => {
    const { privateRoutes, publicRoutes } = useRoutes();
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<BareLayout />}>{renderRoute(publicRoutes)}</Route>
                <Route
                    element={
                        <ErrorBoundary FallbackComponent={InternalServerErrorPage}>
                            <BareLayout />
                        </ErrorBoundary>
                    }>
                    {renderRoute(privateRoutes)}
                </Route>
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<Loader />}>
                            <NotFoundPage />
                        </Suspense>
                    }>

                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouters;
