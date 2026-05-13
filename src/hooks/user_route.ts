import { PAGE_ROUTES } from '../constants/route';
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
const historyPage = lazy(() => import('../pages/history/history'));
const cartPage = lazy(() => import('../pages/cart/cart'));
const checkoutPage = lazy(() => import('../pages/checkout/checkout'));

const useRoutes = () => {
    const publicRoutes: RouteType[] = [
        { path: PAGE_ROUTES.LOGIN, element: LoginPage },
    ];

    const privateRoutes: RouteType[] = [
        { path: PAGE_ROUTES.DASHBOARD, element: DashboardPage },
        { path: PAGE_ROUTES.LOVEPRODUCT, element: lovedProductsPage },
        { path: PAGE_ROUTES.HISTORY, element: historyPage },
        { path: PAGE_ROUTES.CART, element: cartPage },
        { path: PAGE_ROUTES.CHECKOUT, element: checkoutPage },
    ];

    return { publicRoutes, privateRoutes, routes: [...publicRoutes, ...privateRoutes] };
};

export default useRoutes;
