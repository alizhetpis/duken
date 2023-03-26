import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';
import { isAdmin, isAuth } from '../utils.js';

const categoryRouter = express.Router();

categoryRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const { name, slug } = req.body;

    const categoryExists = await Category.findOne({ slug });
    if (categoryExists) {
      res.status(400).send({ message: 'Category already exists' });
      return;
    }

    const category = new Category({ name, slug });
    const createdCategory = await category.save();

    res.status(201).send({
      message: 'Category Created',
      category: createdCategory,
    });
  })
);

categoryRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.send(categories);
  })
);

export default categoryRouter;
