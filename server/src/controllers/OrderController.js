import db from '../models/index.js';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

export const getOrder = async (req, res) => {
    const pageCurrent = parseInt(req.query.page) || 1;
    const getAll = req.query.getAll;
    const pageSize = 4;
    const offset = (pageCurrent - 1) * pageSize;
    let data;
    if (getAll) {
        data = await db.Order.findAll();
    } else {
        data = await db.Order.findAll({
            offset: offset,
            limit: pageSize,
            include: db.User,
        });
    }
    const dataCount = await db.Order.count();
    return res.status(200).json({ orders: data, countAllOrder: dataCount }); // Count all Brand without limit to set pageCount
};

export const addOrder = async (req, res) => {
    const user_id = req.body.user_id;
    const status = req.body.status;
    const total = req.body.total;
    try {
        if (!user_id || total === 0) {
            return res.status(201).json({ type: 'error', message: 'Đặt hàng thất bại' });
        } else {
            const order = await db.Order.create({
                user_id: req.body.user_id,
                status: req.body.status,
                total: req.body.total,
            });
            return res.status(200).json({ result: order, type: 'success', message: 'Đặt hàng thành công' });
        }
    } catch (error) {
        return res.status(201).json({ type: 'error', message: 'Đặt hàng thất bại' });
    }
};

export const detailUser = async (req, res) => {
    // const idBrand = req.params.id;
    const email = req.params.email;

    const data = await db.Brand.findOne({ where: { email: email }, raw: true });
    return res.status(200).json({ user: data });
};

export const editOrder = async (req, res) => {
    try {
        const idOrder = req.params.id;
        const status = req.body.status;
        const order = await db.Order.findOne({ where: { id: idOrder } });

        order.status = status;
        await order.save();
        return res.status(200).json({ message: 'Cập nhật thành công' });
    } catch {
        return res.status(201).json({ message: 'Cập nhật thất bại' });
    }
};

export const searchOrder = async (req, res) => {
    const order_id = req.query.order_id;
    const user_id = req.query.user_id;

    let whereQuery;

    if (order_id) {
        whereQuery = { id: order_id };
    } else {
        whereQuery = { user_id: user_id };
    }

    const data = await db.Order.findAll({
        where: whereQuery,
        include: db.User,
        raw: user_id ? true : false,
        order: [['createdAt', 'DESC']],
    });

    const listOrderID = data.map((order) => order.id);

    const getFirstDetail = await Promise.all(
        listOrderID.map((id) => {
            return new Promise(async (resolve) => {
                const firstDetail = await db.Order_detail.findOne({
                    include: [
                        {
                            model: db.Order,
                            where: {
                                id: id,
                            },
                        },
                        { model: db.Product },
                    ],
                });
                resolve(firstDetail);
            });
        }),
    );

    const orders = data.map((order) => {
        const [orderDisplay] = getFirstDetail.filter((detail) => detail.order_id === order.id);
        return { ...order, order_display: orderDisplay };
    });

    return res.status(200).json({ result: user_id ? orders : data });
};
