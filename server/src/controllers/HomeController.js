import db from '../models/index.js';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const HomeController = async (req, res) => {
    const brandQuery = req.query.brand;
    const sortQuery = req.query.sort;
    const nameQuery = req.query.name;
    const cartProductQuery = req.query.cartProduct;

    let priceQuery = req.query.price;
    let typeQuery = req.query.type;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    let orderQuery;
    let whereQuery = [];

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

    switch (priceQuery) {
        case '0_5m':
            priceQuery = [0, 5000000];
            break;
        case '5m_10m':
            priceQuery = [5000000, 10000000];
            break;
        case '10m_20m':
            priceQuery = [10000000, 20000000];
            break;
        case '20m_over':
            priceQuery = [20000000, 50000000];
            break;
    }

    typeQuery && whereQuery.push({ '$Category.name$': { [Op.like]: `%${typeQuery}%` } });

    brandQuery && whereQuery.push({ '$Brand.name$': { [Op.like]: `%${brandQuery}%` } });

    nameQuery && whereQuery.push({ name: { [Op.like]: `%${nameQuery}%` } });

    priceQuery && whereQuery.push({ price: { [Op.between]: priceQuery } });

    cartProductQuery && whereQuery.push({ id: cartProductQuery });

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
