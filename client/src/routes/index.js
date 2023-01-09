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
    Account,
    Feedback,
    News,
} from '../pages';
import { DefaultLayout, AdminLayout } from '../layouts';

export const UserRoute = [
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
];
export const AdminRoute = [
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
    {
        path: '/Admin/Account',
        component: Account,
        layout: AdminLayout,
    },
    {
        path: '/Admin/Feedback',
        component: Feedback,
        layout: AdminLayout,
    },
    {
        path: '/Admin/News',
        component: News,
        layout: AdminLayout,
    },
];
