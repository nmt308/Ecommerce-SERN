import {
    Product,
    Category,
    Brand,
    Home,
    Login,
    Register,
    ProductDetail,
    Search,
    Cart,
    Order,
    Banner,
    MyOrder,
    Dashboard,
} from '../pages';
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
        path: '/cart',
        component: Cart,
        layout: DefaultLayout,
    },
    {
        path: '/order',
        component: MyOrder,
        layout: DefaultLayout,
    },
    {
        path: '/search/:page',
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
    {
        path: '/Admin/Order',
        component: Order,
        layout: AdminLayout,
    },
    {
        path: '/Admin/Dashboard',
        component: Dashboard,
        layout: AdminLayout,
    },
    {
        path: '/Admin/Banner',
        component: Banner,
        layout: AdminLayout,
    },
];
