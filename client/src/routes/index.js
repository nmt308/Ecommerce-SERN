import { Product, Category, Brand, Home, Login, Register, ProductDetail, Search } from '../pages';
import { DefaultLayout, AdminLayout } from '../layouts';

export const AllRoute = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/login',
        component: Login,
        layout: false,
    },
    {
        path: '/register',
        component: Register,
        layout: false,
    },
    {
        path: '/detail',
        component: ProductDetail,
        layout: DefaultLayout,
    },
    {
        path: '/search',
        component: Search,
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
