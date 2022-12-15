import db from '../models/index.js';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

export const getProduct = async (req, res) => {
    const pageCurrent = parseInt(req.query.page) || 1;
    const pageSize = 4;
    const offset = (pageCurrent - 1) * pageSize;

    const data = await db.Product.findAll({ include: db.Category, offset: offset, limit: pageSize });
    const dataCount = await db.Product.count();

    return res.status(200).json({ products: data, countAllProduct: dataCount }); // Count ll products without limit to set pageCount
};

export const addProduct = async (req, res) => {
    try {
        await db.Product.create({
            name: req.body.name,
            price: req.body.price,
            oldprice: req.body.oldprice,
            image: req.body.image,
            quantity: req.body.quantity,
            brand_id: req.body.brand,
            category_id: req.body.category,
            description: req.body.description,
            specification: req.body.specification,
        });
        return res.status(200).json({ message: 'Thêm mới thành công' });
    } catch {
        return res.status(201).json({ message: 'Thêm mới thất bại' });
    }
};

export const deleteProduct = async (req, res) => {
    const idProduct = req.params.id;
    try {
        await db.Product.destroy({
            where: {
                id: idProduct,
            },
        });
        return res.status(200).json({ message: 'Xóa sản phẩm thành công' });
    } catch (e) {
        return res.status(201).json({ message: 'Sản phẩm này không thể xóa' });
    }
};

export const detailProduct = async (req, res) => {
    const idProduct = req.params.id;
    const data = await db.Product.findOne({ where: { id: idProduct }, include: db.Category, raw: true });
    return res.status(200).json({ product: data });
};

export const editProduct = async (req, res) => {
    try {
        const idProduct = req.params.id;
        const product = await db.Product.findOne({ where: { id: idProduct }, include: db.Category });

        product.name = req.body.name;
        product.price = req.body.price;
        product.oldprice = req.body.oldprice;
        product.image = req.body.image;
        product.quantity = req.body.quantity;
        product.brand_id = req.body.brand;
        product.category_id = req.body.category;
        product.description = req.body.description;
        product.specification = req.body.specification;
        await product.save();

        return res.status(200).json({ message: 'Cập nhật thành công' });
    } catch {
        return res.status(201).json({ message: 'Cập nhật thất bại' });
    }
};

export const searchProduct = async (req, res) => {
    const searchQuery = req.query.name;
    const pageCurrent = parseInt(req.query.page) || 1;
    const pageSize = 4;
    const offset = (pageCurrent - 1) * pageSize;

    const data = await db.Product.findAll({
        where: {
            name: { [Op.substring]: searchQuery },
        },
        include: db.Category,
        offset: offset,
        limit: pageSize,
    });

    const dataCount = await db.Product.count({
        where: {
            name: { [Op.substring]: searchQuery },
        },
    });

    return res.status(200).json({ result: data, availableProduct: dataCount });
};
