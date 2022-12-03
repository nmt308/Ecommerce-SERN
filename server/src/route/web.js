import express from 'express';
import * as APIController from '../controllers/APIController.js';
import * as ProductController from '../controllers/ProductController.js';

const router = express.Router();
export const initAPIRoutes = (app) => {
    //admin route
    router.get('/brands', APIController.getBrand);
    router.get('/categories', APIController.getCategory);

    router.get('/products', ProductController.getProduct);
    router.post('/product/add', ProductController.addProduct);
    router.put('/product/edit/:id', ProductController.editProduct);
    router.delete('/product/delete/:id', ProductController.deleteProduct);
    router.get('/product/detail/:id', ProductController.detailProduct);
    router.get('/product/search', ProductController.searchProduct);
    //Middleware check nếu url có tiền tố /api mới gọi router
    return app.use('/api/', router);
};
