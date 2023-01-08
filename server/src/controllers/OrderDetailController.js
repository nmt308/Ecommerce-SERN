import db from '../models/index.js';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

export const addOrderDetail = async (req, res) => {
    try {
        const orderDetail = await db.Order_detail.create({
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            price: req.body.price,
            quantity: req.body.quantity,
        });

        const product = await db.Product.findOne({
            where: {
                id: req.body.product_id,
            },
        });
        product.quantity = product.quantity - req.body.quantity;
        product.buyturn = product.buyturn + req.body.quantity;
        product.save();

        return res.status(200).json({ result: orderDetail, message: 'Thanh toán thành công' });
    } catch {
        return res.status(201).json({ message: 'ok' });
    }
};

export const detailUser = async (req, res) => {
    // const idBrand = req.params.id;
    const email = req.params.email;

    const data = await db.Brand.findOne({ where: { email: email }, raw: true });
    return res.status(200).json({ user: data });
};

export const searchOrderDetail = async (req, res) => {
    const order_id = req.query.order_id;

    const data = await db.Order_detail.findAll({
        include: [
            {
                model: db.Order,
                where: {
                    id: order_id,
                },
            },
            { model: db.Product },
        ],
    });

    return res.status(200).json({ result: data });
};
