const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports = {
  async getByCategoryId(req, res) {
    try {
      const positions = await Position.find({ category: req.params.categoryId, user: req.user.id });
      res.status(200).json(positions);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  async create(req, res) {
    try {
      const { name, cost, category } = req.body;
      const position = new Position({ name, cost, category, user: req.user.id });
      await position.save();
      res.status(201).json(position);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  async update(req, res) {
    try {
      const position = await Position.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: req.body,
        },
        {
          new: true,
        },
      );
      res.status(200).json(position);
    } catch (e) {
      errorHandler(res, e);
    }
  },
  async remove(req, res) {
    try {
      await Position.remove({ _id: req.params.id });
      res.status(200).json({ message: 'Remove complete' });
    } catch (e) {
      errorHandler(res, e);
    }
  },
};
