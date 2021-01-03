const express = require('express');
const router = express.Router();
const controller = require('../controllers/category')

router.get("/:id", controller.getById);
router.get("/", controller.getAll);
router.delete("/:id", controller.remove);
router.post("/", controller.create);
router.put("/:id", controller.update);

module.exports = router;