import { Product, Category, Brand, Home } from '../pages';
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
    {
        path: '/Admin/Category',
        component: Category,
        layout: AdminLayout,
    },
    {
        path: '/Admin/Brand',
        component: Brand,
        layout: AdminLayout,
    },
];
