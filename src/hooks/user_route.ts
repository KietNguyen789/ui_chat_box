import { PAGE_ROUTES } from '../constants/route';
import { t } from 'i18next';
import { lazy } from 'react';

export type RouteType = {
    index?: boolean;
    path?: string;
    element: React.LazyExoticComponent<React.FC>;
    children?: RouteType[];
    title?: string;
    breadcrumb?: string[];
    templatePath?: (params: any) => string;
};

const LoginPage = lazy(() => import('../pages/login/login'));
const DashboardPage = lazy(() => import('../pages/dashboard/dashboard'));
const lovedProductsPage = lazy(() => import('../pages/love_product/love_product'));
const historyPage = lazy(() => import('../pages/history/history'))

const useRoutes = () => {
    const publicRoutes: RouteType[] = [
        {
            path: PAGE_ROUTES.LOGIN,
            element: LoginPage
        }
    ];


    const privateRoutes: RouteType[] = [
        {
            path: PAGE_ROUTES.DASHBOARD,
            element: DashboardPage,
            title: 'heelo',//`${t(i18nKey.title.dashboard)}`,
            breadcrumb: ['heelo 1234']//[`${t(i18nKey.title.dashboard)}`]
        },
        {
            path: PAGE_ROUTES.LOVEPRODUCT,
            element: lovedProductsPage,
            title: 'heelo',//`${t(i18nKey.title.dashboard)}`,
            breadcrumb: ['heelo 1234']//[`${t(i18nKey.title.dashboard)}`]
        },
        {
            path: PAGE_ROUTES.HISTORY,
            element: historyPage,
            title: 'heelo',//`${t(i18nKey.title.dashboard)}`,
            breadcrumb: ['heelo 1234']//[`${t(i18nKey.title.dashboard)}`]
        },

    ];

    const routes = [...publicRoutes, ...privateRoutes];

    return { publicRoutes, privateRoutes, routes };
};

export default useRoutes;
