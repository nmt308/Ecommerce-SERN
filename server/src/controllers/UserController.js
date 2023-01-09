import db from '../models/index.js';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

export const detailUser = async (req, res) => {
    // const idBrand = req.params.id;
    const email = req.query.email;
    const data = await db.User.findOne({ where: { email: email }, raw: true });
    return res.status(200).json({ user: data });
};
