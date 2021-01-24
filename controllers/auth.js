const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');

module.exports = {
  async login(req, res) {
    try {
      const candidate = await User.findOne({ email: req.body.email });
      if (candidate) {
        const passwordCorrect = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordCorrect) {
          const token = jwt.sign(
            { email: candidate.email, userId: candidate._id },
            process.env.SECRET_KEY,
            {
              expiresIn: 60 * 60,
            },
          );
          res.status(201).json({
            user: {
              ...candidate,
              password: '',
            },
            token: `Bearer ${token}`,
          });
        } else {
          res.status(401).json({ message: 'Password is incorrect, try again' });
        }
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (e) {
      errorHandler(e, res);
    }
  },
  async register(req, res) {
    try {
      const candidate = await User.findOne({ email: req.body.email });
      if (candidate) {
        res.status(409).json({
          message: 'User is exist. Try another.',
        });
      } else {
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        const user = new User({
          email: req.body.email,
          password: passwordHash,
        });

        await user.save();
        res.status(200).json(user);
      }
    } catch (e) {
      errorHandler(e, res);
    }
  },
};
