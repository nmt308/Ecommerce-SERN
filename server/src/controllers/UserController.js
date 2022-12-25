import db from '../models/index.js';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// export const getBrand = async (req, res) => {
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

export const addUser = async (req, res) => {
    try {
        await db.User.create({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        });
        return res.status(200).json({ message: 'Thêm mới thành công' });
    } catch {
        return res.status(201).json({ message: 'Thêm mới thất bại' });
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

// export const detailBrand = async (req, res) => {
//     const idBrand = req.params.id;
//     const data = await db.Brand.findOne({ where: { id: idBrand }, raw: true });
//     return res.status(200).json({ brand: data });
// };

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

// export const searchBrand = async (req, res) => {
//     const searchQuery = req.query.name;
//     const pageCurrent = parseInt(req.query.page) || 1;
//     const pageSize = 4;
//     const offset = (pageCurrent - 1) * pageSize;

//     const data = await db.Brand.findAll({
//         where: {
//             name: { [Op.substring]: searchQuery },
//         },
//         offset: offset,
//         limit: pageSize,
//     });

//     const dataCount = await db.Brand.count({
//         where: {
//             name: { [Op.substring]: searchQuery },
//         },
//     });

//     return res.status(200).json({ result: data, availableBrand: dataCount });
// };
