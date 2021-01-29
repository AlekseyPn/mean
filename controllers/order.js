const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports = {
  async getAll(req, res) {
    try {
      const query = { user: req.user.id };

      // start date
      if (req.query.start) {
        query.date = {
          // great or equal
          $gte: req.query.start,
        };
      }

      // end date
      if (req.query.end) {
        if (!query.date) {
          query.date = {};
        }
        // less or equal
        query.date.$lte = req.query.end;
      }

      if (req.query.order) {
        query.order = +req.query.order;
      }

      const orders = await Order.find(query)
        .sort({ date: -1 })
        .skip(+req.query.offset)
        .limit(+req.query.limit);

      res.status(200).json(orders);
    } catch (e) {
      errorHandler(e, res);
    }
  },
  async create(req, res) {
    try {
      const lastOrder = await Order.findOne({ user: req.user.id }).sort({ date: -1 });
      const maxOrder = lastOrder ? lastOrder.order : 0;

      const order = new Order({
        list: req.body.list,
        user: req.user.id,
        order: maxOrder + 1,
      });
      await order.save();

      res.status(201).json(order);
    } catch (e) {
      errorHandler(e, res);
    }
  },
};
