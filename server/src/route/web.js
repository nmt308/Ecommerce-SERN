import express from 'express';
import * as BrandController from '../controllers/BrandController.js';
import * as ProductController from '../controllers/ProductController.js';
import * as CategoryController from '../controllers/CategoryController.js';
import * as UserController from '../controllers/UserController.js';
const router = express.Router();
export const initAPIRoutes = (app) => {
    //Product
    router.get('/products', ProductController.getProduct);
    router.post('/product/add', ProductController.addProduct);
    router.put('/product/edit/:id', ProductController.editProduct);
    router.delete('/product/delete/:id', ProductController.deleteProduct);
    router.get('/product/detail', ProductController.detailProduct);
    router.get('/product/search', ProductController.searchProduct);

    //Category
    router.get('/categories', CategoryController.getCategory);
    router.post('/category/add', CategoryController.addCategory);
    router.put('/category/edit/:id', CategoryController.editCategory);
    router.get('/category/detail/:id', CategoryController.detailCategory);
    router.delete('/category/delete/:id', CategoryController.deleteCategory);
    router.get('/category/search', CategoryController.searchCategory);

    //Brand
    router.get('/brands', BrandController.getBrand);
    router.post('/brand/add', BrandController.addBrand);
    router.put('/brand/edit/:id', BrandController.editBrand);
    router.get('/brand/detail/:id', BrandController.detailBrand);
    router.delete('/brand/delete/:id', BrandController.deleteBrand);
    router.get('/brand/search', BrandController.searchBrand);

    //User
    router.post('/user/add', UserController.addUser);

    //Middleware check nếu url có tiền tố /api mới gọi router
    return app.use('/api/', router);
};
