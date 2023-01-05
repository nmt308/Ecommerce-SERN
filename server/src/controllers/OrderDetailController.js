import db from '../models/index.js';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// export const getUser = async (req, res) => {
//     const pageCurrent = parseInt(req.query.page) || 1;
//     const getAll = req.query.getAll;
//     const pageSize = 4;
//     const offset = (pageCurrent - 1) * pageSize;
//     let data;
//     if (getAll) {
//         data = await db.Brand.findAll();
//     } else {
//         data = await db.Brand.findAll({
//             offset: offset,
//             limit: pageSize,
//         });
//     }
//     const dataCount = await db.Brand.count();
//     return res.status(200).json({ brands: data, countAllBrand: dataCount }); // Count all Brand without limit to set pageCount
// };

export const addOrderDetail = async (req, res) => {
    try {
        const orderDetail = await db.Order_detail.create({
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            price: req.body.price,
            quantity: req.body.quantity,
        });
        return res.status(200).json({ result: orderDetail, message: 'Thanh toán thành công' });
    } catch {
        return res.status(201).json({ message: 'ok' });
    }
};

// export const deleteBrand = async (req, res) => {
//     const idBrand = req.params.id;
//     try {
//         await db.Brand.destroy({
//             where: {
//                 id: idBrand,
//             },
//         });
//         return res.status(200).json({ message: 'Xóa thương hiệu thành công' });
//     } catch (e) {
//         return res.status(201).json({ message: 'Thương hiệu này không thể xóa' });
//     }
// };

export const detailUser = async (req, res) => {
    // const idBrand = req.params.id;
    const email = req.params.email;

    const data = await db.Brand.findOne({ where: { email: email }, raw: true });
    return res.status(200).json({ user: data });
};

// export const editBrand = async (req, res) => {
//     try {
//         const idBrand = req.params.id;
//         const brand = await db.Brand.findOne({ where: { id: idBrand } });
//         brand.name = req.body.name;
//         brand.image = req.body.image;
//         await brand.save();
//         return res.status(200).json({ message: 'Cập nhật thành công' });
//     } catch {
//         return res.status(201).json({ message: 'Cập nhật thất bại' });
//     }
// };

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
