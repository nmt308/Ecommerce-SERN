import db from '../models/index.js';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

export const getArticle = async (req, res) => {
    const pageCurrent = parseInt(req.query.page) || 1;
    const getAll = req.query.getAll;
    const pageSize = req.query.limit ? parseInt(req.query.limit) : 4;
    const offset = (pageCurrent - 1) * pageSize;
    let data;
    if (getAll) {
        data = await db.News.findAll();
    } else {
        data = await db.News.findAll({
            offset: offset,
            limit: pageSize,
        });
    }
    const dataCount = await db.News.count();
    return res.status(200).json({ articles: data, countAllArticle: dataCount }); // Count all Article without limit to set pageCount
};

export const addArticle = async (req, res) => {
    try {
        const news = await db.News.create({
            title: req.body.title,
            image: req.body.image,
            content: req.body.content,
        });

        const listProducts = req.body.listProducts;
        Promise.all(
            listProducts.map(
                (idProduct) =>
                    new Promise(async (resolve, reject) => {
                        await db.News_detail.create({
                            news_id: news.id,
                            product_id: idProduct,
                        });
                        resolve();
                    }),
            ),
        ).then(() => {
            return res.status(200).json({ message: 'Thêm mới thành công' });
        });
    } catch {
        return res.status(201).json({ message: 'Thêm mới thất bại' });
    }
};

export const deleteArticle = async (req, res) => {
    const idArticle = req.params.id;
    try {
        await db.News_detail.destroy({
            where: {
                news_id: idArticle,
            },
        });
        await db.News.destroy({
            where: {
                id: idArticle,
            },
        });
        return res.status(200).json({ message: 'Xóa danh mục thành công' });
    } catch {
        return res.status(201).json({ message: 'Danh mục này không thể xóa' });
    }
};

export const detailArticle = async (req, res) => {
    const idArticle = req.params.id;
    const news = await db.News.findOne({
        where: {
            id: idArticle,
        },

        raw: true,
    });
    const newsDetail = await db.News_detail.findAll({
        where: {
            news_id: idArticle,
        },

        include: db.Product,
    });
    const data = {
        ...news,
        listProducts: newsDetail,
    };

    return res.status(200).json({ article: data });
};

export const editArticle = async (req, res) => {
    try {
        const idArticle = req.params.id;
        const article = await db.News.findOne({ where: { id: idArticle } });
        article.title = req.body.title;
        article.image = req.body.image;
        article.content = req.body.content;
        await article.save();
        return res.status(200).json({ message: 'Cập nhật thành công' });
    } catch {
        return res.status(201).json({ message: 'Cập nhật thất bại' });
    }
};

export const searchArticle = async (req, res) => {
    const searchQuery = req.query.title;
    const pageCurrent = parseInt(req.query.page) || 1;
    const pageSize = req.query.limit ? parseInt(req.query.limit) : 4;
    const offset = (pageCurrent - 1) * pageSize;

    const data = await db.News.findAll({
        where: {
            title: { [Op.substring]: searchQuery },
        },
        offset: offset,
        limit: pageSize,
    });

    const dataCount = await db.News.count({
        where: {
            title: { [Op.substring]: searchQuery },
        },
    });

    return res.status(200).json({ result: data, availableArticle: dataCount });
};
