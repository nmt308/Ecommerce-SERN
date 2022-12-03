import { Home } from '../pages';
import { Product } from '../pages';
import { DefaultLayout, AdminLayout } from '../layouts';

export const AllRoute = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/Admin/Product',
        component: Product,
        layout: AdminLayout,
    },
];
