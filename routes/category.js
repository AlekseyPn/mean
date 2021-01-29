const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/category');
const upload = require('../middleware/upload');

router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  controller.create,
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  controller.update,
);

module.exports = router;
