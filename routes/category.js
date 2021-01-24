const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/category');

router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.delete('/:id', controller.remove);
router.post('/', controller.create);
router.put('/:id', controller.update);

module.exports = router;
