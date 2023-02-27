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
    NotFound,
    Notification,
    Article,
    News,
} from '../pages';
import { DefaultLayout, AdminLayout } from '../layouts';
import AllArticle from '../pages/user/AllArticles';

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
        path: '/article/:id',
        component: News,
        layout: DefaultLayout,
    },
    {
        path: '/articles',
        component: AllArticle,
        layout: DefaultLayout,
    },
    {
        path: '/notification',
        component: Notification,
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
        path: '/Admin/Article',
        component: Article,
        layout: AdminLayout,
    },
    {
        path: '/Admin/NotFound',
        component: NotFound,
        layout: false,
    },
];
