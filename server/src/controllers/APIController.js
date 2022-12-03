import db from '../models/index.js';

export const getBrand = async (req, res) => {
    const data = await db.Brand.findAll({ raw: true });
    return res.status(200).json({ brands: data });
};

export const getCategory = async (req, res) => {
    const data = await db.Category.findAll({ raw: true });
    return res.status(200).json({ categories: data });
};
