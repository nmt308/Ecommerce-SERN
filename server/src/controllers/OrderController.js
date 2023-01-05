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

export const addOrder = async (req, res) => {
    try {
        const order = await db.Order.create({
            user_id: req.body.user_id,
            status: req.body.status,
            total: req.body.total,
        });

        return res.status(200).json({ result: order, message: 'Thanh toán thành công' });
    } catch (error) {
        return res.status(201).json({ message: error });
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

export const searchOrder = async (req, res) => {
    const searchQuery = req.query.name;
    const user_id = req.query.user_id;

    const pageCurrent = parseInt(req.query.page) || 1;
    const pageSize = 4;
    const offset = (pageCurrent - 1) * pageSize;

    const data = await db.Order.findAll({
        where: {
            user_id: user_id,
        },
        order: [['createdAt', 'DESC']],
        raw: true,
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

    // const dataCount = await db.Brand.count({
    //     where: {
    //         name: { [Op.substring]: searchQuery },
    //     },
    // });

    return res.status(200).json({ result: orders });
};
