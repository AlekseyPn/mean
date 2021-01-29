const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports = {
  async getAll(req, res) {
    try {
      const categories = await Category.find({ user: req.user.id });
      res.status(200).json(categories);
    } catch (e) {
      errorHandler(e, res);
    }
  },
  async getById(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      res.status(200).json(category);
    } catch (e) {
      errorHandler(e, res);
    }
  },
  async remove(req, res) {
    try {
      await Category.remove({ _id: req.params.id });
      await Position.remove({ category: req.params.id });
      res.status(200).json({ message: 'Category and Positions deleted' });
    } catch (e) {
      errorHandler(e, res);
    }
  },
  async create(req, res) {
    try {
      const { name } = req.body;
      const category = new Category({
        name,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : '',
      });
      await category.save();
      res.status(201).json(category);
    } catch (e) {
      //TODO maybe need delete image if Category not created
      errorHandler(e, res);
    }
  },
  async update(req, res) {
    try {
      let updated = { name: req.body.name };
      if (req.file) {
        updated.imageSrc = req.file.path;
      }
      const category = await Category.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: updated,
        },
        { new: true },
      );
      res.status(200).json(category);
    } catch (e) {
      //TODO maybe need delete image if Category not updated
      errorHandler(e, res);
    }
  },
};
