import db from '../models/index.js';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const HomeController = async (req, res) => {
    const brandQuery = req.query.brand;
    const sortQuery = req.query.sort;
    let typeQuery = req.query.type;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    let orderQuery;
    let whereQuery = [{ '$Brand.name$': { [Op.like]: `%${brandQuery}%` } }];

    switch (sortQuery) {
        case 'desc':
            orderQuery = [['price', sortQuery]];
            break;
        case 'asc':
            orderQuery = [['price', sortQuery]];
            break;
        case 'buyturn':
            orderQuery = [['buyturn', 'DESC']];
            break;
        case 'new':
            orderQuery = [['createdAt', 'DESC']];
            break;
    }

    switch (typeQuery) {
        case 'tablet':
            typeQuery = 'Máy tính bảng';
            break;
        case 'phone':
            typeQuery = 'Điện thoại';
            break;
    }
    if (typeQuery) {
        whereQuery.push({ '$Category.name$': { [Op.like]: `%${typeQuery}%` } });
    }
    const data = await db.Product.findAll({
        where: {
            [Op.and]: [whereQuery],
        },
        include: [{ model: db.Category }, { model: db.Brand }],
        offset,
        limit: 10,
        order: orderQuery,
    });

    const dataCount = await db.Product.count({
        where: {
            [Op.and]: [whereQuery],
        },
        include: [{ model: db.Category }, { model: db.Brand }],
    });

    return res.status(200).json({ result: data, availableProduct: dataCount });
};
export default HomeController;
