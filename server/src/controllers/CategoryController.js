import db from '../models/index.js';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

export const getCategory = async (req, res) => {
    const pageCurrent = parseInt(req.query.page) || 1;
    const getAll = req.query.getAll;
    const pageSize = 4;
    const offset = (pageCurrent - 1) * pageSize;
    let data;
    if (getAll) {
        data = await db.Category.findAll();
    } else {
        data = await db.Category.findAll({
            offset: offset,
            limit: pageSize,
        });
    }
    const dataCount = await db.Category.count();
    return res.status(200).json({ categories: data, countAllCategory: dataCount }); // Count all Category without limit to set pageCount
};

export const addCategory = async (req, res) => {
    try {
        await db.Category.create({
            name: req.body.name,
            image: req.body.image,
        });
        return res.status(200).json({ message: 'Thêm mới thành công' });
    } catch {
        return res.status(201).json({ message: 'Thêm mới thất bại' });
    }
};

export const deleteCategory = async (req, res) => {
    const idCategory = req.params.id;
    try {
        await db.Category.destroy({
            where: {
                id: idCategory,
            },
        });
        return res.status(200).json({ message: 'Xóa danh mục thành công' });
    } catch {
        return res.status(201).json({ message: 'Danh mục này không thể xóa' });
    }
};

export const detailCategory = async (req, res) => {
    const idCategory = req.params.id;
    const data = await db.Category.findOne({ where: { id: idCategory }, raw: true });
    return res.status(200).json({ category: data });
};

export const editCategory = async (req, res) => {
    try {
        const idCategory = req.params.id;
        const category = await db.Category.findOne({ where: { id: idCategory } });
        category.name = req.body.name;
        category.image = req.body.image;
        await category.save();
        return res.status(200).json({ message: 'Cập nhật thành công' });
    } catch {
        return res.status(201).json({ message: 'Cập nhật thất bại' });
    }
};

export const searchCategory = async (req, res) => {
    const searchQuery = req.query.name;
    const pageCurrent = parseInt(req.query.page) || 1;
    const pageSize = 4;
    const offset = (pageCurrent - 1) * pageSize;

    const data = await db.Category.findAll({
        where: {
            name: { [Op.substring]: searchQuery },
        },
        offset: offset,
        limit: pageSize,
    });

    const dataCount = await db.Category.count({
        where: {
            name: { [Op.substring]: searchQuery },
        },
    });

    return res.status(200).json({ result: data, availableCategory: dataCount });
};
